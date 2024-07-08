import { Model, ModelStatic, Transaction, FindOptions } from "sequelize";
import { IBaseRepository } from "@Interfaces/IBaseRepository";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    constructor(
        public readonly model: ModelStatic<Model>,
    ) { }

    async create(item: T, transaction: Transaction): Promise<T> {
        const createdItem = await this.model.create(item as any,  {transaction: transaction});
        return createdItem.toJSON() as T;
    }

    async bulkCreate(item: T, transaction: Transaction): Promise<any> {
        return await this.model.bulkCreate(item as any,  {transaction: transaction});
    }

    async findAll(): Promise<T[]> {
        const results = await this.model.findAll();
        return results.map((result) => result.toJSON() as T);
    }

    async findAllWithPagination(pageNo, perPage, relations, conditions, hasRelations, req): Promise<any> {
        let queryResult = [];
        let results: any = {
            count: 0,
            rows: []
        };
        if(hasRelations) {
            results = await this.model.findAndCountAll({
                include: relations,
                limit: parseInt(perPage),
                offset: (pageNo - 1) * perPage,
                where: conditions,
                order: [["id", "desc"]]
            });
            queryResult =  results.rows;
        }
        else
        {
            results = await this.model.findAndCountAll({
                limit: parseInt(perPage),
                offset: (pageNo - 1) * perPage,
                where: conditions,
                order: [["id", "desc"]]
            });
            queryResult = results.rows;
        }

        const totalCount = results.count;
        const currentPage = parseInt(pageNo);
        const totalPages = Math.ceil(totalCount / perPage);
        const nextPage = currentPage < totalPages ? currentPage + 1 : 0;
        const previousPage = currentPage > 1 ? currentPage - 1 : 0;
        const firstPageUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}?page=1`;
        const lastPageUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${totalPages}`;
        return {
            results: queryResult,
            current_page: currentPage,
            per_page: perPage,
            total_data: totalCount,
            total_pages: totalPages,
            next_page: nextPage,
            previous_page: previousPage,
            first_page_url: firstPageUrl,
            last_page_url: lastPageUrl,
            last_page: totalPages
        };
    }

    async findOne(id: number | Partial<T>, include?: object): Promise<T | null> {
        const options: FindOptions = {
            where: { id }
        };
        if (include) {
            options.include = [include];
        }
        const result: any = await this.model.findOne(options);
        return result ? result.toJSON() as T : null;
    }

    async findOneByProperty(whereObject: object): Promise<T | null> {
        const result: any = await this.model.findOne({
            where: {...whereObject}
        });
        return result;
    }

    async findAllByProperty(whereObject: object): Promise<T[]> {
        const results = await this.model.findAll({
            where: { ...whereObject }
        });
        return results.map(result => result.toJSON() as T);
    }

    async update(id: number | Partial<T>, item: T, transaction: Transaction): Promise<boolean> {
        const [rowsUpdated] = await this.model.update(item as any, {
            where: { id },
            returning: true,
            transaction
        });

        if (rowsUpdated === 0) {
            return false;
        }

        return true;
    }

    async delete(id: number, transaction: Transaction): Promise<boolean> {
        const result = await this.model.destroy({
            where: { id },
            transaction
        });

        return result > 0;
    }

    async deleteByProperty(whereObject: object, transaction: Transaction): Promise<boolean> {
        const result = await this.model.destroy({
            where: {...whereObject},
            transaction
        });

        return result > 0;
    }

}
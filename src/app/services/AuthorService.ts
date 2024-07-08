import { AuthorRepository } from '@Repositories/AuthorRepository';
import sequelize from '@Config/database';
import { ApiError } from '@Utils/errorHandler';
import { IAuthor, UpdateAuthorData } from '@Entities/IAuthor';
import { BookRepository } from '@Repositories/BookRepository';
import User from '@Models/User';
import Author from '@Models/Author';

export class AuthorService {
    repository: AuthorRepository;
    bookRepository: BookRepository;

    constructor() {
        this.repository = new AuthorRepository();
        this.bookRepository = new BookRepository();
    }

    async createAuthor(authorData: IAuthor): Promise<IAuthor> {
        const transaction = await sequelize.transaction();
        try {
            const createdAuthor = await this.repository.create(authorData, transaction);
            await transaction.commit();
            return createdAuthor;
        } catch (error) {
            await transaction.rollback();
            throw new ApiError('CREATE_ERROR', 500, 'Unable to create author.');
        }
    }

    async findAllAuthors(pageNo: number, perPage: number, relations: any, conditions: any, hasRelations: boolean, req: any): Promise<any> {
        try {
            relations = [{model: User, as: 'user', attributes: ['id', 'username', 'status']}];
            return await this.repository.findAllWithPagination(pageNo, perPage, relations, conditions, hasRelations, req);
        } catch (error) {
            throw new ApiError('FIND_ERROR', 500, 'Unable to find authors.');
        }
    }

    async findAuthorById(id: number): Promise<IAuthor | null> {
        try {
            return await this.repository.findOne(id, {model: User, as: 'user', attributes: ['id', 'username', 'status']});
        } catch (error) {
            throw new ApiError('FIND_ERROR', 500, 'Unable to find author.');
        }
    }

    async updateAuthor(id: number, authorData: UpdateAuthorData): Promise<IAuthor | null> {
        const transaction = await sequelize.transaction();
        try {
            await this.repository.update(id, authorData as IAuthor, transaction);
            await transaction.commit();
            return this.findAuthorById(id);
        } catch (error) {
            await transaction.rollback();
            throw new ApiError('UPDATE_ERROR', 500, 'Unable to update author.');
        }
    }

    async getBooksByAuthorId(pageNo: number, perPage: number, relations: any, conditions: any, hasRelations: boolean, req: any): Promise<any> {
        try {
            const author = await this.repository.findOne(req.params.id);
            if (!author) {
                throw new ApiError('NOT_FOUND', 404, 'Author not found.');
            }

            relations = [{model: Author, as: 'author', attributes: ['id', 'name']}];
            return await this.bookRepository.findAllWithPagination(pageNo, perPage, relations, conditions, hasRelations, req);
        } catch (error) {
            throw new ApiError('FIND_ERROR', 500, 'Unable to find authors.');
        }
    }

    async getAuthorById(authorId: number): Promise<IAuthor | null> {
        return this.repository.findOne(authorId);
    }

    async getAuthorByUserId(userId: number): Promise<IAuthor | null> {
        return this.repository.findOneByProperty({ user_id: userId });
    }

    async deleteAuthor(id: number): Promise<boolean> {
        const transaction = await sequelize.transaction();
        try {
            const deleted = await this.repository.delete(id, transaction);
            await transaction.commit();
            return deleted;
        } catch (error) {
            await transaction.rollback();
            throw new ApiError('DELETE_ERROR', 500, 'Unable to delete author.');
        }
    }
}

import { BookRepository } from '@Repositories/BookRepository';
import sequelize from '@Config/database'
import { Op } from 'sequelize';;
import { ApiError } from '@Utils/errorHandler';
import { IBook, UpdateBookData } from '@Entities/IBook';
import Author from '@Models/Author';

export class BookService {
    repository: BookRepository;

    constructor() {
        this.repository = new BookRepository();
    }

    async createBook(bookData: IBook): Promise<IBook> {
        const transaction = await sequelize.transaction();
        try {
            const createdBook = await this.repository.create(bookData, transaction);
            await transaction.commit();
            return createdBook;
        } catch (error) {
            await transaction.rollback();
            throw new ApiError('CREATE_ERROR', 500, 'Unable to create book.');
        }
    }

    async findAllBooks(pageNo: number, perPage: number, relations: any, conditions: any, hasRelations: boolean, req: any): Promise<any> {
        try {
            relations = [{model: Author, as: 'author', attributes: ['id', 'name']}];
            if (req.query.title) {
                conditions.title = { [Op.like]: `%${req.query.title}%` };
            }
    
            if (req.query.author_name) {
                if (!relations.includes(Author)) {
                    relations.push({
                        model: Author,
                        where: { name: { [Op.like]: `%${req.query.author_name}%` } },
                        required: true
                    });
                }
            }
            return await this.repository.findAllWithPagination(pageNo, perPage, relations, conditions, hasRelations, req);
        } catch (error) {
            throw new ApiError('FIND_ERROR', 500, 'Unable to find authors.');
        }
    }

    async findBookById(bookId: number): Promise<IBook | null> {
        try {
            const book = await this.repository.findOne(bookId, {model: Author, as: 'author', attributes: ['id', 'name']});
            if (!book) {
                throw new ApiError('NOT_FOUND', 404, 'Book not found.');
            }
            return book;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError('FETCH_ERROR', 500, 'Unable to fetch book.');
        }
    }

    async updateBook(bookId: number, bookData: UpdateBookData): Promise<IBook | null> {
        const transaction = await sequelize.transaction();
        try {
            await this.repository.update(bookId, bookData as IBook, transaction);
            await transaction.commit();
            const book = await this.repository.findOne(bookId, {model: Author, as: 'author', attributes: ['id', 'name']});
            return book
        } catch (error) {
            await transaction.rollback();
            throw new ApiError('UPDATE_ERROR', 500, 'Unable to update book.');
        }
    }

    async deleteBook(bookId: number): Promise<boolean> {
        const transaction = await sequelize.transaction();
        try {
            const deleted = await this.repository.delete(bookId, transaction);
            await transaction.commit();
            return deleted;
        } catch (error) {
            await transaction.rollback();
            throw new ApiError('DELETE_ERROR', 500, 'Unable to delete book.');
        }
    }
}

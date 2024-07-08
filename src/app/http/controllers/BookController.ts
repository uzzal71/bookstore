import { Request, Response } from 'express';
import { ResponseSuccess, ResponseError } from '@Utils/HttpResponse';
import { validateRequest } from '@Utils/requestValidation';
import { BookService } from '@Services/BookService';
import { BookRequest } from '@Requests/BookRequest';
import { UpdateBookData } from '@Entities/IBook';
import Author from '@Models/Author'

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public createBook = async (_req: any, res: Response) => {
        try {
            await validateRequest(BookRequest, _req, res);
            const authorId = parseInt(_req?.user?.author?.id);
            if (!authorId) return ResponseError(res, 500, 'Author not found');
            const author = await Author.findOne({ where: { id: authorId, user_id: _req?.user?.id} });
            if (!author) return ResponseError(res, 404, 'Author not found or not authorized to create a book');

            _req.body.author_id = authorId;
            const newBook = await this.bookService.createBook(_req.body);
            return ResponseSuccess(res, 201, 'Book created successfully', newBook);
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    public getAllBooks = async (_req: Request, res: Response) => {
        try {
            const pageNo = parseInt(_req.query.page as string, 10) || 1;
            const perPage = parseInt(_req.query.per_page as string, 10) || 10;
            const relations = [];
            const conditions = {};
            const hasRelations = true;

            const paginationResult = await this.bookService.findAllBooks(
                pageNo,
                perPage,
                relations,
                conditions,
                hasRelations,
                _req
            );

            return ResponseSuccess(res, 200, 'Books fetched successfully with pagination', paginationResult);
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };

    public getBookById = async (_req: Request, res: Response) => {
        try {
            const bookId = parseInt(_req.params.id, 10);
            const book = await this.bookService.findBookById(bookId);

            if (book) {
                return ResponseSuccess(res, 200, 'Book fetched successfully', book);
            } else {
                return ResponseError(res, 404, 'Book not found');
            }
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    };

    public updateBook = async (_req: any, res: Response) => {
        const { id } = _req.params;
        try {
            await validateRequest(BookRequest, _req, res);
            const book = await this.bookService.findBookById(id);
            if (!book) return ResponseError(res, 404, 'Book not found');

            const authorId = parseInt(_req?.user?.author?.id);
            if (!authorId || book.author_id!== authorId) return ResponseError(res, 401, 'You are not authorized to update this book');

            const updated = await this.bookService.updateBook(+id, _req.body as UpdateBookData);
            if (updated) {
                return ResponseSuccess(res, 200, 'Book updated successfully', updated);
            } else {
                return ResponseError(res, 404, 'Book not found');
            }
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    public deleteBook = async (_req: any, res: Response) => {
        const { id } = _req.params;
        try {
            const book = await this.bookService.findBookById(id);
            if (!book) return ResponseError(res, 404, 'Book not found');

            const authorId = parseInt(_req?.user?.author?.id);
            if (!authorId || book.author_id!== authorId) return ResponseError(res, 401, 'You are not authorized to update this book');

            const deleted = await this.bookService.deleteBook(+id);
            if (deleted) {
                return ResponseSuccess(res, 200, 'Book deleted successfully', {id: id});
            } else {
                return ResponseError(res, 404, 'Book not found');
            }
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    public getBooksByAuthorId = async (_req: Request, res: Response) => {
        try {
            const pageNo = parseInt(_req.query.page as string, 10) || 1;
            const perPage = parseInt(_req.query.per_page as string, 10) || 10;
            const relations = [];
            const conditions = {author_id: parseInt(_req.params.id)};
            const hasRelations = true;

            const paginationResult = await this.bookService.findAllBooks(
                pageNo,
                perPage,
                relations,
                conditions,
                hasRelations,
                _req
            );

            return ResponseSuccess(res, 200, 'Books fetched successfully with pagination', paginationResult);
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };
}

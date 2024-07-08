import { Request, Response } from 'express';
import { ResponseSuccess, ResponseError } from '@Utils/HttpResponse';
import { validateRequest } from '@Utils/requestValidation';
import { BookService } from '@Services/BookService';
import { BookRequest } from '@Requests/BookRequest';
import { UpdateBookData } from '@Entities/IBook';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    async createBook(_req: Request, res: Response) {
        try {
            await validateRequest(BookRequest, _req, res);
            const newBook = await this.bookService.createBook(_req.body);
            return ResponseSuccess(res, 201, 'Book created successfully', newBook);
        } catch (error) {
            return ResponseError(res, 500, 'Failed to create book');
        }
    }

    async getAllBooks(req: Request, res: Response) {
        try {
            const books = await this.bookService.findAllBooks();
            return ResponseSuccess(res, 200, 'Books retrieved successfully', books);
        } catch (error) {
            return ResponseError(res, 500, 'Failed to fetch books');
        }
    }

    public getBookWithPagination = async (req: Request, res: Response) => {
        try {
            const pageNo = parseInt(req.query.page as string, 10) || 1;
            const perPage = parseInt(req.query.perPage as string, 10) || 10;
            const relations = [];  // Define relations if needed
            const conditions = {}; // Define conditions if needed
            const hasRelations = false; // Change to true if relations are defined

            const paginationResult = await this.bookService.findBooksWithPagination(
                pageNo,
                perPage,
                relations,
                conditions,
                hasRelations,
                req
            );

            return ResponseSuccess(res, 200, 'Books fetched successfully with pagination', paginationResult);
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };

    public getBookById = async (req: Request, res: Response) => {
        try {
            const bookId = parseInt(req.params.id, 10);
            const book = await this.bookService.findBookById(bookId);

            if (book) {
                return ResponseSuccess(res, 200, 'Book fetched successfully', book);
            } else {
                return ResponseError(res, 404, 'Book not found');
            }
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };

    async updateBook(_req: Request, res: Response) {
        const { id } = _req.params;
        try {
            await validateRequest(BookRequest, _req, res);
            const updated = await this.bookService.updateBook(+id, _req.body as UpdateBookData);
            if (updated) {
                return ResponseSuccess(res, 200, 'Book updated successfully', updated);
            } else {
                return ResponseError(res, 404, 'Book not found');
            }
        } catch (error) {
            return ResponseError(res, 500, 'Failed to update book');
        }
    }

    async deleteBook(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deleted = await this.bookService.deleteBook(+id);
            if (deleted) {
                return ResponseSuccess(res, 200, 'Book deleted successfully', deleted);
            } else {
                return ResponseError(res, 404, 'Book not found');
            }
        } catch (error) {
            return ResponseError(res, 500, 'Failed to delete book');
        }
    }

    public getBooksByAuthorId = async (req: Request, res: Response) => {
        try {
            const authorId = parseInt(req.params.id, 10);
            const books = await this.bookService.getBooksByAuthorId(authorId);
            return ResponseSuccess(res, 200, "Books by the specified author fetched successfully", books);
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };
}

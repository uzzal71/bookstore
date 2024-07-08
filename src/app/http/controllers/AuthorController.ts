import { Request, Response } from 'express';
import { ResponseSuccess, ResponseError } from '@Utils/HttpResponse';
import { validateRequest } from '@Utils/requestValidation';
import { AuthorService } from '@Services/AuthorService';
import { AuthorRequest } from '@Requests/AuthorRequest';

export class AuthorController {
    private authorService: AuthorService;

    constructor() {
        this.authorService = new AuthorService();
    }

    public createAuthor = async (_req: any, res: Response) => {
        try {
            await validateRequest(AuthorRequest, _req, res);
            const authorData = _req.body;
            authorData.user_id = _req?.user?.id;
            const existingAuthor = await this.authorService.getAuthorByUserId(_req?.user?.id);

            if (existingAuthor) {
                return ResponseError(res, 400, 'User already has an author profile.');
            }

            const newAuthor = await this.authorService.createAuthor(authorData);
            return ResponseSuccess(res, 201, 'Author created successfully', newAuthor);
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };

    public getAllAuthors = async (_req: Request, res: Response) => {
        try {
            const pageNo = parseInt(_req.params.page as string, 10) || 1;
            const perPage = parseInt(_req.params.per_page as string, 10) || 10;
            const relations = [];
            const conditions = {};
            const hasRelations = true;

            const authors = await this.authorService.findAllAuthors(
                pageNo,
                perPage,
                relations,
                conditions,
                hasRelations,
                _req
            );

            return ResponseSuccess(res, 200, 'Authors fetched successfully', authors);
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };

    public getAuthorById = async (req: Request, res: Response) => {
        try {
            const authorId = parseInt(req.params.id, 10);
            const author = await this.authorService.findAuthorById(authorId);

            if (author) {
                return ResponseSuccess(res, 200, 'Author fetched successfully', {author});
            } else {
                return ResponseError(res, 404, 'Author not found');
            }
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };

    public updateAuthor = async (_req: any, res: Response) => {
        try {
            await validateRequest(AuthorRequest, _req, res);
            const authorId = parseInt(_req.params.id, 10);
            const existingAuthor = await this.authorService.getAuthorById(authorId);
            if (!existingAuthor || existingAuthor.user_id !== parseInt(_req?.user?.id)) {
                return ResponseError(res, 404, 'You are not authorized to update this author profile.');
            }

            const updateData = _req.body;
            const updated = await this.authorService.updateAuthor(authorId, updateData);

            if (updated) {
                return ResponseSuccess(res, 200, 'Author updated successfully', updated);
            } else {
                return ResponseError(res, 404, 'Author not found');
            }
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };

    public getBooksByAuthor = async (req: Request, res: Response) => {
        try {
            const authorId = parseInt(req.params.id, 10);
            const books = await this.authorService.getBooksByAuthorId(authorId);
            return ResponseSuccess(res, 200, "Author all books fetched successfully", books);
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };

    public deleteAuthor = async (_req: any, res: Response) => {
        try {
            const authorId = parseInt(_req.params.id, 10);
            const existingAuthor = await this.authorService.getAuthorById(authorId);

            if (!existingAuthor || existingAuthor.user_id !== _req?.user?.id) {
                return ResponseError(res, 404, 'You are not authorized to update this author profile.');
            }

            const deleted = await this.authorService.deleteAuthor(authorId);

            if (deleted) {
                return ResponseSuccess(res, 200, 'Author deleted successfully', {id: authorId});
            } else {
                return ResponseError(res, 404, 'Author not found');
            }
        } catch (error: any) {
            return ResponseError(res, 500, error.message);
        }
    };

}

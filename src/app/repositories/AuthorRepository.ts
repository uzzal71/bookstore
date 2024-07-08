import { BaseRepository } from '@Repositories/BaseRepository';
import Author from '@Models/Author';
import { IAuthor } from '@Entities/IAuthor';

export class AuthorRepository extends BaseRepository<IAuthor> {
    constructor() {
        super(Author);
    }
}

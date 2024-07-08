import { BaseRepository } from '@Repositories/BaseRepository';
import Book from '@Models/Book';
import { IBook } from '@Entities/IBook';

export class BookRepository extends BaseRepository<IBook> {
    constructor() {
        super(Book);
    }
}

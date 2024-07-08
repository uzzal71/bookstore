import { Model, Table, Column, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Author from '@Models/Author';
import { IBook } from '@Entities/IBook';

@Table({ tableName: 'books' })
class Book extends Model<Book> implements IBook{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ForeignKey(() => Author)
    @Column({ type: DataType.INTEGER })
    author_id: number;

    @Column({ type: DataType.STRING })
    title: string;

    @Column({ type: DataType.STRING })
    description: string;

    @Column({ type: DataType.DATEONLY })
    published_date: string;

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    status: boolean;

    @BelongsTo(() => Author)
    author: Author;

    @Column({ type: DataType.VIRTUAL })
    get author_info(): any {
        if (this.author) {
            const authorData = { ...this.author.get() };
            return authorData;
        }
        return {};
    }
}

export default Book;

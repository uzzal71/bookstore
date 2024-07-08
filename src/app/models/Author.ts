import { Model, Table, Column, DataType, Default, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import User from '@Models/User';
import Book from '@Models/Book';
import { IAuthor } from '@Entities/IAuthor'

@Table({ tableName: 'authors' })
class Author extends Model<Author> implements IAuthor {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    user_id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.TEXT })
    bio: string;

    @Column({ type: DataType.DATEONLY })
    birthdate: string;

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    status: boolean;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Book, { onDelete: 'CASCADE' })
    books: Book[];
}

export default Author;

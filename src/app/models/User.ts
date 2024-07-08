import { Table, Column, Model, DataType, Default, HasOne } from 'sequelize-typescript';
import Author from '@Models/Author';
import {IUser} from '@Entities/IUser';

@Table({ tableName: 'users' })
class User extends Model<User> implements IUser {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({ type: DataType.STRING })
    username: string;

    @Column({ type: DataType.STRING })
    password: string;

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    status: boolean;

    @HasOne(() => Author, { onDelete: 'CASCADE' })
    author: Author;
}

export default User;

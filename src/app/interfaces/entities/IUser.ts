import { IAuthor } from "./IAuthor";

export interface IUser {
    id?: number,
    username: string,
    password: string,
    status?: boolean,
    author?: IAuthor;
}
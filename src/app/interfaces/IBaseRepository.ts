import { Transaction } from "sequelize"

export interface IBaseRepository <T> {
    create(item: T, transaction: Transaction): Promise<T>
    findAll(): Promise<T[]>
    findOne(id: number | Partial<T>): Promise<T | null>
    update(id: number | Partial<T>, item: T, transaction: Transaction): Promise<boolean>
    delete(id: number | Partial<T>, transaction: Transaction): Promise<boolean>
}

export type TBaseRepository<T> = IBaseRepository<T>;


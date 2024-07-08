import { BaseRepository } from '@Repositories/BaseRepository';
import User from '@Models/User';
import Author from '@Models/Author';
import { IUser } from '@Entities/IUser';

export class AuthRepository extends BaseRepository<IUser> {
    constructor() {
        super(User);
    }

    async findOneByPropertyWithAuthor(whereObject: object): Promise<IUser | null> {
        const result: any = await this.model.findOne({
            where: { ...whereObject },
            attributes: { exclude: ['password'] },
            include: [{ model: Author, as: 'author' }]
        });
        return result ? result.toJSON() : null;
    }
}

export interface IAuthor {
    id?: number,
    user_id: number,
    name: string,
    bio: string,
    birthdate: string
    status?: boolean
}

export type UpdateAuthorData = Omit<Partial<IAuthor>, 'user_id'>;

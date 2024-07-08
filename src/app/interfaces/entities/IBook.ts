export interface IBook {
    id?: number,
    author_id: number,
    title: string,
    description: string,
    published_date: string,
    status?: boolean
}

export type UpdateBookData = Omit<Partial<IBook>, 'author_id'>;
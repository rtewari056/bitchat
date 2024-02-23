import { number, object, string, TypeOf } from 'zod';

const searchUserSchema = object({
    query: object({
        search: string().optional(),
        limit: number().optional()
    })
});

type SearchUserInput = TypeOf<typeof searchUserSchema>['query'];

export { searchUserSchema, SearchUserInput }
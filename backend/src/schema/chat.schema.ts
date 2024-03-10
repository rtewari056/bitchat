import { object, string, TypeOf } from 'zod';

const accessChatSchema = object({
    body: object({
        userId: string({
            required_error: 'User id is required'
        }).optional()
    })
});

type AccessChatInput = TypeOf<typeof accessChatSchema>['body'];

export { accessChatSchema, AccessChatInput }
import { array, object, string, TypeOf } from 'zod';

const accessChatSchema = object({
    body: object({
        userId: string({
            required_error: 'User id is required'
        })
    })
});

const createGroupChatSchema = object({
    body: object({
        name: string({
            required_error: 'Group chat name is required'
        }),
        users: string({
            required_error: 'Id of users is required'
        })
        .refine(users => {
            try {
                const parsedUsers = JSON.parse(users) as string[];

                // Check if parsed object is a array and all of its value is string
                if (Array.isArray(parsedUsers) && parsedUsers.every((item) => typeof item === 'string')) {
                    return true;
                }
            } catch (error: unknown) {
                return false; // Handle parsing error
            }

        }, {
            message: 'users is not valid'
        })
        .refine(users => {
            try {
                const parsedUsers = JSON.parse(users) as string[];
                return parsedUsers.length >= 2;
            } catch (error: unknown) {
                return false; // Handle parsing error
            }
        }, {
            message: 'More than 2 users are required to form a group chat'
        })
    })
});

type AccessChatInput = TypeOf<typeof accessChatSchema>['body'];
type CreateGroupChatInput = TypeOf<typeof createGroupChatSchema>['body'];

export { accessChatSchema, AccessChatInput, createGroupChatSchema, CreateGroupChatInput }
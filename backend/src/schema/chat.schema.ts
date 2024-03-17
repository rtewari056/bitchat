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

const renameGroupChatSchema = object({
    body: object({
        chatId: string({
            required_error: 'Chat id is required'
        }),
        chatName: string({
            required_error: 'Chat name is required'
        })
    })
});

const addToGroupChatSchema = object({
    body: object({
        chatId: string({
            required_error: 'Chat id is required'
        }),
        userId: string({
            required_error: 'User id is required'
        })
    })
});

const removeFromGroupChatSchema = object({
    body: object({
        chatId: string({
            required_error: 'Chat id is required'
        }),
        userId: string({
            required_error: 'User id is required'
        })
    })
});

type AccessChatInput = TypeOf<typeof accessChatSchema>['body'];
type CreateGroupChatInput = TypeOf<typeof createGroupChatSchema>['body'];
type RenameGroupChatInput = TypeOf<typeof renameGroupChatSchema>['body'];
type AddToGroupChatInput = TypeOf<typeof addToGroupChatSchema>['body'];
type RemoveFromGroupChatInput = TypeOf<typeof removeFromGroupChatSchema>['body'];

export { accessChatSchema, AccessChatInput, createGroupChatSchema, CreateGroupChatInput, renameGroupChatSchema, RenameGroupChatInput, addToGroupChatSchema, AddToGroupChatInput, removeFromGroupChatSchema, RemoveFromGroupChatInput }
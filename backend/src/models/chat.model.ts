import { InferSchemaType, Schema, model } from 'mongoose';

const chatSchema = new Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    groupAdmin: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

type ChatDocument = InferSchemaType<typeof chatSchema>; // Create model type using provided schema

export default model<ChatDocument>('Chat', chatSchema);
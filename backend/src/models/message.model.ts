import { InferSchemaType, Schema, model } from 'mongoose';

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, trim: true },
    chat: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
}, { timestamps: true });

type MessageDocument = InferSchemaType<typeof messageSchema>; // Create model type using provided schema

export default model<MessageDocument>('Message', messageSchema);
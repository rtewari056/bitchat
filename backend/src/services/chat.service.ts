import ChatModel from "../models/chat.model"
import UserModel from "../models/user.model";

const getChatById = async (currentUserId: string, requestedUserId: string) => {
    const results = await ChatModel.find({
        isGroupChat: false, // 'isGroupChat' will be false as it is one-to-one chat

        // Currently logged in user id and the requested user id we sent should be same in the 'users' array
        $and: [
            { users: { $elemMatch: { $eq: currentUserId } } },
            { users: { $elemMatch: { $eq: requestedUserId } } },
        ],
    })
    .populate('users') // Populate all users
    .populate('latestMessage'); // Populate all latest message
        
    return await UserModel.populate(results, {
        path: 'latestMessage.sender',
        select: 'name email profile_pic', // Fields we want to populate
    });
}

const createNewChat = (newChatData: any) => {
    return ChatModel.create(newChatData);
}

const getCreatedChatById = (chatId: string) => {
    return ChatModel.findOne({ _id: chatId }).populate('users')
}

const getAllChatsById = async (userId: string) => {
    const results = await ChatModel.find({
        users: {
            $elemMatch: { $eq: userId }
        }
    })
    .populate('users')
    .populate('groupAdmin')
    .populate('latestMessage')
    .sort({ updatedAt: -1 });
    
    return await UserModel.populate(results, {
        path: 'latestMessage.sender',
        select: 'name email profile_pic'
    });
}

export default { getChatById, createNewChat, getCreatedChatById, getAllChatsById };
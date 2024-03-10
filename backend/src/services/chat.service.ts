import ChatModel from "../models/chat.model"
import UserModel from "../models/user.model";

const getChatById = (currentUserId: string, requestedUserId: string) => {
    return ChatModel.find({
        isGroupChat: false, // 'isGroupChat' will be false as it is one-to-one chat
        // Currently logged in user id and the requested user id we sent should be same in the 'users' array
        $and: [
            { users: { $elemMatch: { $eq: currentUserId } } },
            { users: { $elemMatch: { $eq: requestedUserId } } },
        ],
    })
    .populate('users') // Populate all users
    .populate('latestMessage'); // Populate all latest message
}

const getChatWithSender = (chatData: any) => {
    return UserModel.populate(chatData, {
        path: "latestMessage.sender",
        select: "name email profile_pic", // Fields we want to populate
      });
    
}

export default { getChatById, getChatWithSender };
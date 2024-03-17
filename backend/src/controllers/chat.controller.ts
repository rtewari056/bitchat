import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

import ErrorResponse from '../helpers/error.class';

import db from '../services/chat.service';
import userService from '../services/user.service';
import { AccessChatInput, CreateGroupChatInput } from '../schema/chat.schema';

dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

// @description     Create or access existing chat between two user
// @route           POST /api/chat
// @access          Private
const accessChat = async (req: Request<{}, {}, AccessChatInput>, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  try {

    const { userId } = req.body;
    const currentUserId: string = res.locals.user.id;

    let chatExists = await db.getChatById(currentUserId, userId);

    // Check if chat exists, else create a new chat
    if (chatExists.length > 0) {
      return res.status(200).send(chatExists[0]);
    } else {
      let newChatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [currentUserId, userId],
      };

      const createdChat = await db.createNewChat(newChatData);

      const fullChat = await db.getCreatedChatById(createdChat.id);

      return res.status(200).json(fullChat);

    }

  } catch (error: unknown) {
    return next(error);
  }
};

// @description     Fetch all chats between two users
// @route           GET /api/chat
// @access          Private
const fetchChat = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  try {

    const currentUserId: string = res.locals.user.id;

    const fullChat = await db.getAllChatsById(currentUserId);

    return res.status(200).json(fullChat);

  } catch (error: unknown) {
    return next(error);
  }
};

// @description     Create group chat
// @route           POST /api/chat/group
// @access          Private
const createGroupChat = async (req: Request<{}, {}, CreateGroupChatInput>, res: Response, next: NextFunction) => {
  try {
    const { name, users } = req.body;

    const currentUserId = res.locals.user.id as string;

    // Add current user in the group chat
    const groupChatUsers = JSON.parse(users) as string[];
    groupChatUsers.push(currentUserId)

    const newGroupChatData = {
      chatName: name,
      users: groupChatUsers,
      isGroupChat: true,
      groupAdmin: await userService.getUserById(currentUserId) // Make the current user as admin
    }

    const groupChat = await db.createNewGroupChat(newGroupChatData);

    const fullGroupChat = await db.getCreatedGroupChatById(groupChat.id);

    return res.status(200).json(fullGroupChat);

  } catch (error: unknown) {
    return next(error);
  }
};

export default { accessChat, fetchChat, createGroupChat };
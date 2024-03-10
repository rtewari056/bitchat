import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

import ErrorResponse from '../helpers/error.class';

import db from '../services/chat.service';
import { AccessChatInput } from '../schema/chat.schema';
import chatModel from '../models/chat.model';

dotenv.config({ path: path.resolve(process.cwd(), 'src/.env') });

// @description     Create or fetch existing chat
// @route           GET /api/chat
// @access          Private
const accessChat = async (req: Request<{}, {}, AccessChatInput>, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
  try {

    const { userId } = req.body;
    const currentUserId: string = res.locals.user.id;

    // If chat with 'userId' not present in request
    if (!userId) {
      return next(new ErrorResponse('UserId param not sent with request', 400));
    }

    let chatExists: any = await db.getChatById(currentUserId, userId);

    chatExists = await db.getChatWithSender(chatExists);

    // Check if chat exists, else create a new chat
    if (chatExists.length > 0) {
      return res.status(200).send(chatExists[0]);
    } else {
      let newChatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [currentUserId, userId],
      };

      try {
        const createdChat = await chatModel.create(newChatData);
        const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        return next(error);
      }
    }

  } catch (error: unknown) {
    return next(error);
  }
};

export default { accessChat };
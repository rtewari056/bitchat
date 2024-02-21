import UserModel from "../models/user.model"

import { User } from "../types/mongoose.type";

const findUserByEmail = (email:  string) => {
    return UserModel.findOne({ email });
}

const createUser = (user: User) => {
    return new UserModel(user).save();
}

const getUserById = (id: string) => {
    return UserModel.findById(id);
}

const updateUserById = (id: string, values: Record<string, string | boolean | null>) => {
    return UserModel.findByIdAndUpdate(id, values);
}

export default { findUserByEmail, createUser, getUserById, updateUserById };
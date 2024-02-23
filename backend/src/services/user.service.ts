import UserModel from "../models/user.model"

import { User } from "../types/mongoose.type";
import { DecodedTokenData } from "../types";

const getUserByEmail = (email: string) => {
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

/**
 * 
 * @param search - Search term
 * @param currentUser - Current user data
 * @param limit - Maximum number of documents the query will return
 * @returns 
 */
const getUsersBySearchTerm = (search: string | undefined, currentUser: DecodedTokenData, limit: number = 100) => {
    // If search term present then filter the list else return all users
    return UserModel.find(search ? {
        $and: [
            {
                $or: [
                    { name: { $regex: search, $options: 'i' } }, // Case-insensitive search by name
                    { email: { $regex: search, $options: 'i' } }, // Case-insensitive search by email
                ]
            },
            { _id: { $ne: currentUser.id } } // Exclude current user
        ],

    } : {}).limit(limit).sort({ name: 'asc' });
}

export default { getUserByEmail, createUser, getUserById, updateUserById, getUsersBySearchTerm };
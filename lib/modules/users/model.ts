import * as mongoose from 'mongoose';

export interface IUser {
    _id?: String;
    name: {
        first_name: String;
        middle_name: String;
        last_name: String;
    };
    email: String;
    phone_number: String;
    gender?: String;
    posts?: mongoose.Types.ObjectId[]; // Array to store post IDs
    reviews?:mongoose.Types.ObjectId[];
    password: String;
    token?: String;
    rol?: String;
    encryptPassword(password: String): Promise<String>;
    validatePassword(password: String): Promise<boolean>;
}
export interface IUserModel extends IUser, Document {}

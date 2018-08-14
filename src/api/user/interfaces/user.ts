import { Model, Document } from "mongoose";

interface IUserDocument extends Document {
  name: string;
  password: string;
  roles: string[];
}

interface IUser extends IUserDocument {
  comparePassword(password: string): boolean;
}

export interface IUserModel extends Model<IUser> {
  // hashPassword(password: string): boolean;
}

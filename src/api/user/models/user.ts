import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

import { IUserModel } from "../interfaces/user";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true, default: false },
  roles: [{ type: String }]
  //   email: { type: String },
  //   googleId: { type: String }
});

userSchema.pre("save", async function(this: any, next: any) {
  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign(
    { sub: this._id, roles: this.roles },
    config.get("JWT_SECRET"),
    {
      expiresIn: 60 * 60
    }
  );
};

userSchema.set("toJSON", { virtuals: true });

export const User: IUserModel = mongoose.model("User", userSchema);

import bcrypt from "bcryptjs";
import User from "../models/user.model"



export const createUser = async (data:any) => {
  data.password = await bcrypt.hash(data.password, 10);
  const result = await User.insertOne(data);
  return result.ops[0]; // Return the inserted document
};

export const findUserByEmail = async (email:any) => {
  return User.findOne({ email });
};

export const comparePasswords = async (inputPassword:any, hashedPassword:any) => {
  return bcrypt.compare(inputPassword, hashedPassword);
};

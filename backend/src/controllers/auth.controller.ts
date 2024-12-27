import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  comparePasswords,
} from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
const generateUserToken = (user: { _id: any; role: any; }) => {
  return jwt.sign({ userId: user._id, role: user.role }, "your-secret", {
    expiresIn: "30d",
  });
};

export const registerUser = async (req:Request, res:Response) => {
  try {
    const data = req.cleanBody;
    const user = await createUser(data);

    delete user.password; // Remove password before sending response
    const token = generateUserToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const loginUser = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.cleanBody;
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const matched = await comparePasswords(password, user.password);
    if (!matched) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const token = generateUserToken(user);
    delete user.password; // Remove password before sending response

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

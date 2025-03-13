import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    res.json({ token, role: user.role });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};

import wrapAsync from "../utils/tryCatchWraper.js";
import { registerUser,loginUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const {token,user} = await registerUser(name, email, password);
  req.user=user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "registered successfully" },token);
});

export const login = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const {token,user}=await loginUser(email,password);
    req.user=user;
    res.cookie("accessToken",token,cookieOptions);
    res.status(200).json({ message: "logged in successfully" },token);
});

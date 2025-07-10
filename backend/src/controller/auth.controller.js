import wrapAsync from "../utils/tryCatchWraper.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";
import { verifyToken } from "../utils/helper.js";

export const register = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, user } = await registerUser(name, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res
    .status(200)
    .json({ user: user, message: "registered successfully" }, token);
});

export const login = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res
    .status(200)
    .json({ user: user, message: "logged in successfully" }, token);
});

export const logout = wrapAsync(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.status(200).json({ message: "logout success" });
});

export const get_current_user = wrapAsync(async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  const user = verifyToken(token);
  if (!user) return res.status(401).json({ error: "Invalid token" });
  res.status(200).json({ user: req.user });
});

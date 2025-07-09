import { nanoid } from 'nanoid';
import jsonwebtoken from 'jsonwebtoken';

export const generateNanoid = (length = 8) => {
  return nanoid(length);
}


export const signToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment variables");
  }

  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
}

export const verifyToken = (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (err) {
    console.error("Invalid or expired token:", err.message);
    return null;
  }
};

import { nanoid } from 'nanoid';
import jsonwebtoken from 'jsonwebtoken';

export const generateNanoid = (length ) => {
  return nanoid(length);;
}

export const signToken=(payload)=>{
  return jsonwebtoken.sign(
    payload,
    process.env.JWT_SECRET,
    {expiresIn:"24h"}
  );
}

export const verifyToken = (token) => {
  const decoded=jsonwebtoken.verify(token, process.env.JWT_SECRET);
  return decoded.id;
}

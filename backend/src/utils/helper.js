import { nanoid } from 'nanoid';
import jsonwebtoken from 'jsonwebtoken';

export const generateNanoid = (length ) => {
  return nanoid(length);;
}

export const signToken=(payload)=>{
  return jsonwebtoken.sign(
    payload,
    process.env.JWT_SECRET,
    {expiresIn:"1h"}
  );
}

export const verifyToken = (token) => {
  const decoded=jsonwebtoken.verify(token, process.env.JWT_SECRET);
  console.log("decoded",decoded.id);
  return decoded.id;
}

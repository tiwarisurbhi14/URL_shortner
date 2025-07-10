export const cookieOptions = {
  maxAge: 24*60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: "None",
};

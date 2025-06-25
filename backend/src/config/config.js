export const cookieOptions = {
  maxAge: 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

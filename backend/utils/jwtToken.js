export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Decide cookie name based on role
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // Secure in production
    sameSite: "lax",                                // Fixes cookie blocking issues
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode)
    .cookie(cookieName, token, cookieOptions)
    .json({
      success: true,
      message,
      user,
      token,
    });
};

import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Helper function to verify token safely (works on latest jsonwebtoken)
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    throw new ErrorHandler("Invalid or expired token!", 401);
  }
};

// =============================
// ADMIN AUTH
// =============================
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies?.adminToken;

  if (!token) {
    return next(new ErrorHandler("Dashboard user is not authenticated!", 400));
  }

  const decoded = verifyToken(token);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
    );
  }

  next();
});

// =============================
// PATIENT AUTH
// =============================
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies?.patientToken;

  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 400));
  }

  const decoded = verifyToken(token);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    return next(new ErrorHandler("User not found!", 404));
  }

  if (req.user.role !== "Patient") {
    return next(
      new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
    );
  }

  next();
});

// =============================
// ROLE AUTHORIZATION
// =============================
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} not allowed to access this resource!`, 403)
      );
    }
    next();
  };
};

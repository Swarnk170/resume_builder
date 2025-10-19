import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Invalid token." });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error in protect route middleware",
      error: error.message,
    });
  }
};

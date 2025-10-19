import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. No token provided." });
    }

    // Remove "Bearer " prefix
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access. Token missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Protect Route Error:", error.message); // log to Vercel
    return res.status(401).json({
      message: "Unauthorized access. Invalid token.",
      error: error.message,
    });
  }
};

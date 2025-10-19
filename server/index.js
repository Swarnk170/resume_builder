import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/connectdb.js";

import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import resumeRouter from "./routes/resume.route.js";
import aiRouter from "./routes/ai.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Resume Builder API");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});

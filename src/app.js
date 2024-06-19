import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// Create Express app
const app = express();

// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import router from "./routes/user.routes.js";

// Routes declarations
app.use("/api/v1/users", router);

// Export app
export default app;

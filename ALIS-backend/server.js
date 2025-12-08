// ALIS-backend/server.js
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

import admin from "./config/firebaseAdmin.js"; // your firebase admin initializer

// route imports - make sure these files exist under ./routes
import authRoute from "./routes/auth.js";
import chatRoute from "./routes/chat.js";
import uploadRoute from "./routes/upload.js";
import sanctionRoute from "./routes/sanction.js";
import statsRoute from "./routes/stats.js";

dotenv.config();

const app = express();

// ----- MIDDLEWARE -----
app.use(
  cors({
    origin: "*", // tighten this for production to your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Increase JSON body limit for potential file metadata / model payloads
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// file upload (salary slips etc)
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    createParentPath: true,
  })
);

// ---- ROUTES ----
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/upload-salary", uploadRoute);
app.use("/api/sanction", sanctionRoute);
app.use("/api/admin", statsRoute);

// health check
app.get("/", (req, res) => {
  res.type("text").send("Backend API is running successfully.");
});

// 404 for unknown API paths
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: "Not Found" });
});

// centralized error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

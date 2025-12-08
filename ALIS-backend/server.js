// ALIS-backend/server.js
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";

import admin from "./config/firebaseAdmin.js";

import authRoute from "./routes/auth.js";
import chatRoute from "./routes/chat.js";
import uploadRoute from "./routes/upload.js";
import sanctionRoute from "./routes/sanction.js";
import statsRoute from "./routes/stats.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ extended: true, limit: "12mb" }));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    createParentPath: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/upload-salary", uploadRoute);
app.use("/api/sanction", sanctionRoute);
app.use("/api/admin", statsRoute);

// health-check
app.get("/", (req, res) => res.send("Backend API is running successfully."));

// 404
app.use((req, res) => res.status(404).json({ success: false, error: "Not Found" }));

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ success: false, error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

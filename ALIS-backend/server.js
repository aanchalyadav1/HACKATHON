import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import admin from "./config/firebaseAdmin.js";

// ROUTES
import authRoute from "./routes/auth.js";
import chatRoute from "./routes/chat.js";
import uploadRoute from "./routes/upload.js";
import sanctionRoute from "./routes/sanction.js";
import statsRoute from "./routes/stats.js";

dotenv.config();
const app = express();

// ---- MIDDLEWARE ----
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json({ limit: "10mb" }));
app.use(fileUpload());

// ---- ROUTES ----
app.use("/api/auth", authRoute);          // Register + Login
app.use("/api/chat", chatRoute);          // Chat Agent
app.use("/api/upload-salary", uploadRoute); 
app.use("/api/sanction", sanctionRoute);  
app.use("/api/admin", statsRoute);        // Dashboard stats

// ---- HEALTH CHECK ----
app.get("/", (req, res) => {
  res.send("Backend API is running successfully.");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

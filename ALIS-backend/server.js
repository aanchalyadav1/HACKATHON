import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import admin from './config/firebaseAdmin.js';
import chatRoute from './routes/chat.js';
import uploadRoute from './routes/upload.js';
import sanctionRoute from './routes/sanction.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/api/chat', chatRoute);
app.use('/api/upload-salary', uploadRoute);
app.use('/api/sanction', sanctionRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log("Backend running on", PORT));

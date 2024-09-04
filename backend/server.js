import express from 'express';
import cors from 'cors';

import { connectDatabase } from './config/db.js';

import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';

import 'dotenv/config.js';


// App config
const app = express();
const port = 3030;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDatabase();

// API endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('API working!');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
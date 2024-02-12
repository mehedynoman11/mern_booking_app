import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
    console.log("MongoDB is Connected!");
})
.catch(err => {
    console.error(err);
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server Running on port 3000 at ' +  new Date().toLocaleString());
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

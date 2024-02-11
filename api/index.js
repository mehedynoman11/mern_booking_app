import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

app.listen(3000, () => {
    console.log('Server Running on port 3000 at ' +  new Date().toLocaleString());
})
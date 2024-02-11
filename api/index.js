import express from 'express'

const app = express();

app.listen(3000, () => {
    console.log('Server Running on port 3000 at ' +  new Date().toLocaleString());
})
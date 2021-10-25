import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dep = { useNewUrlParser: true, useUnifiedTopology: true };
const port = process.env.PORT || 4000;
const database = process.env.DATABSE;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
});

mongoose.connect(database, dep)
  .then(() => {
    console.log("Database connected sucessfully!");
    app.listen(port,() => {
        console.log(`Sever Listening on PORT: ${port}`);
    })
}).catch(err => console.log(err));
import express from 'express';
import mongoose from 'mongoose';
import chalk from "chalk";
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
    console.log(chalk.blue.inverse("Database connected sucessfully!"));
    app.listen(port,() => {
        console.log(chalk.green.inverse(`Sever Listening on PORT: ${port}`));
    })
}).catch(err => console.log(chalk.red(err)));
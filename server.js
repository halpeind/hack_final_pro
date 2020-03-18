const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const url = "mongodb://localhost:27017/learning-mongodb";

app.use(bodyParser.json());

const connect = async () => {
    try {
        const db = await mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify:true});
        console.log("Successfully connected to mongodb");
    } catch (error) {
        console.log("Error connected to mongodb, Error: ", console.error);
        process.exit();
    }
}

connect();

const routes = require("./route/note.route");
routes(app);

app.get("/", (req, res) => {
    res.json({message: "Success"});
});

app.listen(3000, () => console.log("Server is running ..."));
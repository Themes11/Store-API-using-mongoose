const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const product = require("./routes/products")

require("dotenv").config()
require("express-async-errors")

const express = require("express");
const app = express();

app.use("/", product)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log("server is listening"))
    } catch (error) {
        console.log(error)
    }
}

start()
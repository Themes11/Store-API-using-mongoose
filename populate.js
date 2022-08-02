const mongoose = require("mongoose");
const connectDB = require("./db/connect")
const productsV = require("./products.json")
require("dotenv").config()
const products =  require("./models/product")

const start = async () => {try {
    await connectDB(process.env.MONGO_URI)
    await products.create(productsV);
    console.log("Done")
    process.exit(0)
} catch (error) {
    console.log(error);
    process.exit(1)
}
}

start()

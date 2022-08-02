const mongoose = require("mongoose");
const products = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true,
        enum: ["ikea", "marcos", "liddy", "caressa"]
    },
    rating: {
        type: Number
    },
    featured:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Products", products)
const { getProducts } = require("../controllers/products");
const express = require("express");
const router = express.Router()

router.route("/").get(getProducts)

module.exports = router
const product = require("../models/product")
const getProducts = async (req, res, next) => {
    const {featured, name, fields, numericFilter, sort, page} = req.query
    const searchObject = {}

    // Search using featured value
    if(featured){
        searchObject.featured = featured === "true" ? true : false
    }

    // // Search by name
    if(name){
        searchObject.name = name
    }

    // // Search with price and rating
    if(numericFilter){
        const operators = {
            "<": "$lt",
            "<=": "$lte",
            "=": "$eq",
            ">": "$gt",
            ">=": "$gte"
        }
        const regex = /(<|>|>=|<=|=)/
        let filters = numericFilter.replace(regex, (regexOperator) => `-${operators[regexOperator]}-`)
        filters = filters.split("-")
        const [option, operator, value] = filters
        searchObject[option] = {[operator]: Number(value)}
    }
    

    let products = product.find(searchObject);


    // Display only name and company

    

    if(fields){
        const selectParams = fields.split(",").join(" ")
        products = products.select(`${selectParams}`)
    }

    if(sort){
        const sortParams = sort.split(",").join(" ")
        products = products.sort(`${sortParams}`)
    }

    const pageNum = Number(page) || 1
    const limit = 7
    const result = await products.skip((pageNum-1)*limit).limit(limit)

    
    res.status(200).json(result)


   
}

module.exports = {getProducts}


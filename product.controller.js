const Product = require('../models/product');

// Get All Products
function index(req , res) {
    Product.find({})
    .select('name _id')
    .then(products => {
        if(products.length === 0) {
            res.status(404).json({
                message : "No Products Yet" , 
                method : "GET" , 
                statusCode : "404"
            })
        }else{
            res.status(200).json({
                message : "Products Retrieved Successfully" , 
                method : "GET" , 
                url : "http://localhost:8000/products" ,
                statusCode : "200" ,
                products : products
            })
        }
    }).catch(err => {
        res.status(500).json({error : err})
    })
} 
// Get Single Product
function show(req , res) {
    const id = req.params.id
    Product.findById(id).then(product => {
        if(product){
            res.status(200).json({
                message : "Product Retrieved Successfully" , 
                product : product
            })
        }else{
            res.status(404).json({
                message : "Error 404 Product Not Found"
            })
        }
    }).catch(err => {
        res.status(500)
        .json({
            error : err
        })
    })
}
// Add New Product
function store(req , res) {
    const product = new Product({
        name : req.body.name ,
        price : req.body.price , 
        vendor : req.body.vendor
    })

    product.save()
    .then(product => {
        res.status(201).json({
            message : "Product Created Successfully" , 
            method : "POST" , 
            url : "http://localhost:8000/products" , 
            createdProduct : product
        })
        }).catch(err => {
            res.status(500).json({
                error : err
        })
    })
}
// Update One Product => PATCH
function update(req , res) {
    const id = req.params.id
    Product.findByIdAndUpdate(id , {$set : req.body})
    .then(product => {
        if(product) {
            res.status(200).json({
                message : "Product Updated Successfully" , 
                product : product
            })
        }else{
            res.status(404).json({message : "Product Not Found"})
        }
    }).catch(err => {
        res.status(500).json({
            error : err
        })
    })

}
// Replace => PUT
function replace(req , res) {
    const id = req.params.id
    const product = Product.findById(id)
    product.name = req.body.name
    product.price = req.body.price
    product.vendor = req.body.vendor

    product.save().then((product) => {
        res.status(200).json({
            product : product
        })
    }).catch(err => {
        res.json({
            error : err
        })
    })
}
// Delete Product
function destroy(req , res) {
    const id = req.params.id
    Product.findByIdAndDelete(id)
    .then((product) => {
        if(product) {
            res.status(200).json({
                message : "Product Deleted Successfully" , 
                deletedProduct : product
            })
        }else{
            res.status(404).json({
                message : "Error 404 Product Not Found"
            })
        }
    }).catch(err => {
        res.status(500)
        .json({
            error : err
        })
    })
}

module.exports = {
    index , 
    show , 
    store , 
    update ,
    destroy,
    replace
}
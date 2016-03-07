var router = require("express").Router()
var Product = require("../models/products")
router.use(require('method-override')('_method'));


router.get("/", function(req, res, next) {
  Product
  .find({})
  .exec().
  then(function(products) {
    console.log(products);
    res.render("products", {products: products});
  })
  // res.render("products");
})

router.get("/active", function(req, res, next) {
  var products;
  Product
  .find({active: true})
  .exec()
  .then(function(products) {
    console.log(products)
    res.render("products", {products: products})
  })

});

router.put("/:product/quantity", function(req, res, next) {
  Product
  .findOne({ name: req.params.product})
  .exec()
  .then(function(product) {
    console.log(product)
    product.quantity = req.body.quantity
    return product.save()
  })
  .then(function(product) {
    res.redirect("/products");
  })
  .then(null, next);
})

router.put("/:product/available", function(req, res, next) {
  Product
  .findOne({ name: req.params.product })
  .exec()
  .then(function(product) {
    if(product.active) product.active = false;
    else product.active = true;
    return product.save()
  })
  .then(function(product) {
    res.redirect("/products");
  })
  .then(null, next);
})

router.post("/", function(req, res, next) {
  // res.redirect("../");
  var name = req.body.name;
  var description = req.body.description;
  var product = new Product({
    name: name,
    description: description
  });
  console.log(product);
  product
  .save()
  .then(function(savedProduct) {
    res.redirect("/products")
  })
  .then(null, next);
})

module.exports = router;

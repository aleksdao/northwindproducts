var router = require("express").Router();
var Product = require("../models/products");
router.use(require('method-override')('_method'));


router.get("/", function(req, res, next) {
  Product.find({})
    .then(function(products) {
      console.log(products);
      res.render("products", {products: products});
    }, next);
});

router.get("/active", function(req, res, next) {
  Product.find({active: true})
    .then(function(products) {
      res.render("products", {products: products});
    }, next);
});

router.put("/:name/quantity", function(req, res, next) {
  Product.findOne({ name: req.params.name})
    .then(function(product) {
      product.quantity = req.body.quantity;
      return product.save();
    })
    .then(function(product) {
      res.redirect("/products");
    }, next);
});

router.put("/:name/available", function(req, res, next) {
  Product
  .findOne({ name: req.params.name })
  .then(function(product) {
    product.active = !product.active;
    return product.save();
  })
  .then(function(product) {
    res.redirect("/products");
  }, next);
});

router.post("/", function(req, res, next) {
  var name = req.body.name;
  var description = req.body.description;
  var product = new Product({
    name: name,
    description: description
  });
  product.save()
    .then(function(savedProduct) {
      res.redirect("/products");
    }, next);
});

module.exports = router;

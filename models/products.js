var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/northwind");

var db= mongoose.connection;
db.on("error", console.error.bind(console, "mongo db connection error"));

var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
});

productSchema.virtual("route").get(function() {
  return "/products/" + this._id;
})

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
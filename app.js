var express = require("express");
var swig = require("swig");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());//needed?

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "html");
app.engine("html", swig.renderFile);

app.use(require('method-override')('_method'));


app.use("/products", require("./routes/products"));

app.get("/", function(req, res, next) {
  res.render("index");
});

app.use(function(err, req, res, next){
  console.log(err);
  res.sendStatus(500);
});

app.listen(3000);//separate out server into another file.. server.js

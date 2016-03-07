var express = require("express");
var app = express();
var swig = require("swig");
var path = require("path");
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "html");
app.engine("html", swig.renderFile);

app.use(require('method-override')('_method'));

app.use(express.static(path.join(__dirname, "/public")));

app.use("/products", require("./routes/products"));

app.get("/", function(req, res, next) {
  res.render("index")
});

app.listen(3000);
var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  console.log("get");
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/api/burgers", function (req, res) {
  console.log("get api");
  burger.selectAll(function (data) {
  return res.json(data);
});
});


router.post("/api/burgers", function(req, res) {
  burger.create(
    ["burger_name", "devoured"], [req.body.burger_name, false], function(result) {
    console.log(result);
       return res.redirect("/");
  });
});


router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("Updating at: ", condition);
  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
      return res.redirect("/");
  
  });
});

// Export routes for server.js to use.
module.exports = router;
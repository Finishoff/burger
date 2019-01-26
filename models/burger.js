// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(col, val, cb) {
    orm.create("burgers", col, val, function(res) {
      cb(res);
    });
  },
  update: function(objColVal, condition, cb) {
    orm.update("burgers", objColVal, condition, function(res) {
      cb(res);
    });
  },
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
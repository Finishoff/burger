var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];
    
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },


  create: function(table, col, val, cb) {
    var queryString = "INSERT INTO " + table;
   
    queryString += " (";
    queryString += col.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(val.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, val, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

update: function(table, objColVal, condition, cb) {
  var queryString = "UPDATE " + table;

  queryString += " SET ";
  queryString += objToSql(objColVal);
  queryString += " WHERE ";
  queryString += condition;

  console.log(queryString);
  connection.query(queryString, function(err, result) {
    if (err) {
      throw err;
    }

    cb(result);
  });
}

};

module.exports = orm;
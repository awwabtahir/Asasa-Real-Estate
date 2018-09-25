var mongoose = require('mongoose');
var City = mongoose.model('City');

module.exports.save = function (req, res) {

    console.log("success");

    if (!req.body) {
      res.status(401).json({
        "message": "No data found!"
      });
    } else {
      var city = new City(req.body);
      city.save(function (err) {
        res.status(200);
        res.json({
          "message": "success"
        });
      });
    }
  
  };

  module.exports.getAll = function (req, res) {
    City
      .find()
      .exec(function (err, cities) {
        res.status(200).json(cities);
      });
  };
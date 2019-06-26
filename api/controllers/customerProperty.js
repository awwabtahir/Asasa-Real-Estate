var mongoose = require('mongoose');
var CustomerProperty = mongoose.model('CustomerProperty');

module.exports.save = function (req, res) {

    console.log("success");

    if (!req.body) {
        res.status(401).json({
            "message": "No data found!"
        });
    } else {
        var customerProperty = new CustomerProperty(req.body);
        customerProperty.save(function (err) {
            res.status(200);
            res.json({
                "message": "success"
            });
        });
    }

};

module.exports.getAll = function (req, res) {
    CustomerProperty
      .find()
      .exec(function (err, customersProperty) {
        res.status(200).json(customersProperty);
      });
  };
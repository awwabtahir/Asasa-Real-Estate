var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports.save = function (req, res) {

    console.log("success");

    if (!req.body) {
        res.status(401).json({
            "message": "No data found!"
        });
    } else {
        var customer = new Customer(req.body);
        customer.save(function (err) {
            res.status(200);
            res.json({
                "message": "success"
            });
        });
    }

};

module.exports.getAll = function (req, res) {
    Customer
      .find()
      .exec(function (err, customers) {
        res.status(200).json(customers);
      });
  };
var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');

module.exports.save = function (req, res) {

  if (!req.body) {
    res.status(401).json({
      "message": "No data found!"
    });
  } else {
    var ad = new Ad(req.body);
    ad.save(function (err) {
      res.status(200);
      res.json({
        "message": "success"
      });
    });
  }

};

module.exports.getAll = function (req, res) {
  Ad
    .find()
    .exec(function (err, inventories) {
      res.status(200).json(inventories);
    });
};
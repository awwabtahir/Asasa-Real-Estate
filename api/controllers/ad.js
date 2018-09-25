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

module.exports.update = function (req, res) {

  if (!req.body) {
    res.status(401).json({
      "message": "No data found!"
    });
  } else {
    var query = { '_id': req.body._id };
    delete req.body._id;
    Ad.findOneAndUpdate(query, req.body, function (err, doc) {
      res.status(200).json("success");
    });
  }

};

module.exports.delete = function (req, res) {
  Ad.find({ _id: req.body._id }).remove().exec(function (err) {
    res.status(200).json("success");
  });
};

module.exports.getAll = function (req, res) {
  Ad
    .find()
    .exec(function (err, ads) {
      res.status(200).json(ads);
    });
};
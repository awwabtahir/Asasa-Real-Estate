var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./api/config/s3_config.json');
var s3Bucket = new AWS.S3({ params: { Bucket: 'asasamaps' } });

module.exports.save = function (req, res) {

  if (!req.body) {
    res.status(401).json({
      "message": "No data found!"
    });
  } else {
    var ad = new Ad(req.body);
    ad.save(function (err, ad) {
      res.status(200).json(ad._id);
    });
  }

};

module.exports.update = function (req, res) {

  if (!req.body) {
    res.status(401).json({
      "message": "No data found!"
    });
  } else {
    if (req.body.imagesData.image3d !== undefined) {
      add3dImage(req.body, res);
    }
    else {
      var query = { '_id': req.body._id };
      delete req.body._id;
      Ad.findOneAndUpdate(query, req.body, function (err, ad) {
        res.status(200).json(ad._id);
      });
    }
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

function add3dImage(data, res) {  
  const buf = new Buffer(
    data.imagesData.image3d.value.replace(
      /^data:image\/\w+;base64,/, ""), 'base64'
  );
  const params = {
    Key: 'images3d/' + data._id + "/" + data.imagesData.image3d.filename,
    Body: buf,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };
  s3Bucket.putObject(params, function (err, data1) {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        msg: 'Failed to upload image. }'
      });

    }
    else {
      delete data.imagesData.image3d.value;
      data.imagesData.image3d['url'] = "https://asasamaps.s3.amazonaws.com/images3d/" + data._id + "/" +
        data.imagesData.image3d.filename;
      var query = { '_id': data._id };
      delete data._id;
      Ad.findOneAndUpdate(query, data, function (err, ad) {
        res.status(200).json(ad._id);
      });
    }

  });
}
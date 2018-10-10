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
  var data = req.body;
  if (!data) {
    res.status(401).json({
      "message": "No data found!"
    });
  } else {
    var image3d = data.imagesData.image3d;
    if (image3d !== undefined) {
      if (image3d.remove !== undefined) delete3dImage(data, res);
      else if (image3d.url) updateAd(data, res);
      else add3dImage(data, res);
    }
    else {
      updateAd(data, res);
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

function updateAd(data, res) {
  var query = { '_id': data._id };
  delete data._id;
  Ad.findOneAndUpdate(query, data, function (err, ad) {
    res.status(200).json(ad._id);
  });
}

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
      updateAd(data, res);
    }

  });
}

function delete3dImage(data, res) {
  const params = {
    Key: 'images3d/' + data._id + "/" + data.imagesData.image3d.filename,
  };
  s3Bucket.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err);
      return res.json({ success: false, msg: err });
    }
  });

  delete data.imagesData.image3d;
  updateAd(data, res);
}
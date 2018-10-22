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
      if(err) res.status(401).json({"message": "failed"});
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

module.exports.updateImage = function (req, res) {
  var data = req.body;
  if (!data) {
    res.status(401).json({
      "message": "No data found!"
    });
  } else {
    if (data.remove !== undefined) removeImage(data, res);
    else addImage(data, res);
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
  Ad.findOneAndUpdate(query, data,{new: true}, function (err, ad) {
    if(err) res.json({ success: false, msg: err });
    res.status(200).json(ad);
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

function addImage(data, res) {
  const buf = new Buffer(
    data.value.replace(
      /^data:image\/\w+;base64,/, ""), 'base64'
  );
  const params = {
    Key: 'property_images/' + data.adId + "/" + data.filename,
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
      delete data.value;
      data['url'] = "https://asasamaps.s3.amazonaws.com/property_images/" + data.adId + "/" +
        data.filename;
      Ad.find({ _id: data.adId }).exec(function (err, ad) {
        ad = ad[0];
        if (ad.imagesData.images == undefined) ad.imagesData.images = [];
        ad.imagesData["images"].push(data);
        updateAd(ad, res);
      });
    }

  });
}

function removeImage(data, res) {
  const params = {
    Key: 'property_images/' + data.adId + "/" + data.filename,
  };
  s3Bucket.deleteObject(params, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({ success: false, msg: err });
    } else {
      Ad.find({ _id: data.adId }).exec(function (err, ad) {
        ad = ad[0];
        foundData = search("filename", data.filename, ad.imagesData["images"]);
        let index = ad.imagesData["images"].indexOf(foundData);
        if (index > -1) {
          ad.imagesData["images"].splice(index, 1);
        }
        updateAd(ad, res);
      });
    }
  });
}

function search(prop, nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i][prop] === nameKey) {
      return myArray[i];
    }
  }
}
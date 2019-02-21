var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function (req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function (err, user) {
        res.status(200).json(user);
      });
  }

};

module.exports.getAgents = function (req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
  } else {
    User
      .find()
      .exec(function (err, ads) {
        res.status(200).json(ads);
      });
  }

};

module.exports.updateFav = function (req, res) {
  let fav = req.body;
  User.findById(fav.userId, function (err, user) {
    if (err) console.log(err);

    user.set({
      favourites: fav.favourites
    });
    user.save(function (err, updatedUser) {
      if (err) console.log(err);
      res.send(updatedUser);
    });
  });
}

module.exports.updateUser = function (req, res) {
  let updatedUser = req.body;
  User.findById(updatedUser._id, function (err, user) {
    if (err) return handleError(err);

    user.set({
      name: updatedUser.name,
      phone: updatedUser.phone
    });
    user.save(function (err, updatedUser) {
      if (err) return handleError(err);
      res.send(updatedUser);
    });
  });
};

module.exports.updateAgent = function (req, res) {
  let agent = req.body;
  User.findById(agent._id, function (err, user) {
    if (err) return handleError(err);

    user.set({
      name: agent.name,
      phone: agent.phone,
      email: agent.email,
      cityId: agent.cityId,
      locationId: agent.locationId
    });
    user.save(function (err, updatedUser) {
      if (err) return handleError(err);
      res.send(updatedUser);
    });
  });
};

module.exports.deleteAgent = function (req, res) {
  User.find({ _id: req.body._id }).remove().exec(function (err) {
    res.status(200).json("success");
  });
};

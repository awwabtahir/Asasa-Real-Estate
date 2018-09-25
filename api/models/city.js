var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var citySchema = new mongoose.Schema({
    city: { type: String, unique: true },
    lat: Number,
    lng: Number
});

citySchema.plugin(autoIncrement.plugin, 'City');
mongoose.model('City', citySchema);
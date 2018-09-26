var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var citySchema = new mongoose.Schema({
    city: { required: true, type: String, unique: true },
    lat: { required: true, type: Number },
    lng: { required: true, type: Number }
});

citySchema.plugin(autoIncrement.plugin, 'City');
mongoose.model('City', citySchema);
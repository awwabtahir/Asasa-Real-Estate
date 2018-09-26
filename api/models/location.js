var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var locationSchema = new mongoose.Schema({
    cityId: { required: true, type: String },
    location: { required: true, type: String, unique: true },
    lat: { required: true, type: Number },
    lng: { required: true, type: Number },
    overlayData: Object
});

locationSchema.plugin(autoIncrement.plugin, 'Location');
mongoose.model('Location', locationSchema);
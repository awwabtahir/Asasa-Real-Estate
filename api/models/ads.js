var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var adSchema = new mongoose.Schema({
    area: String,
    areaType: String,
    biz_comm: Object,
    demand: String,
    title: String,
    description: String,
    healthcare: Object,
    vidUrl: String,
    locationData: Object,
    nearby_loc: Object,
    other: Object,
    plot_features: Object,
    propNumber: String,
    rooms: Object,
    street: String,
    type: String,
    subtype: String
});

adSchema.plugin(autoIncrement.plugin, 'Ad');
mongoose.model('Ad', adSchema);
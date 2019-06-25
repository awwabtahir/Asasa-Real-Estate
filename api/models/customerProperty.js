var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var customerPropertySchema = new mongoose.Schema({
    email: { required: true, type: String },
    name: { type: String },
    phone: { required: true, type: String },
    area: { type: String },
    property_type: { type: String },
    city: Object,
    location: Object,
    created:  {type: Date, default: Date.now}
});

customerPropertySchema.plugin(autoIncrement.plugin, 'CustomerProperty');
mongoose.model('CustomerProperty', customerPropertySchema);
var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

var customerSchema = new mongoose.Schema({
    id: { required: true, type: Number, unique: true },
    email: String,
    name: String,
    image: String,
    provider: String
});

customerSchema.plugin(autoIncrement.plugin, 'Customer');
mongoose.model('Customer', customerSchema);
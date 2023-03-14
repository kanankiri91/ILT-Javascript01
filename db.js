const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required: true
    }
});

const Item = mongoose.model("items", ItemSchema);

module.exports = Item;
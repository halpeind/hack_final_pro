const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    description: String,
    nominal: Number,
    category: String
}, {
    timestamps: true
});

module.exports = mongoose.model("note", noteSchema);
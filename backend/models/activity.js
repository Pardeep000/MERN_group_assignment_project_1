const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    activityType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hours:{
        type: Number,
        required: true
    },
    minutes:{
        type: Number,
        required: true
    },
    date: {
        type: String,
        required:true
    }
});

const Act = mongoose.model("activity", activitySchema);

module.exports = Act;

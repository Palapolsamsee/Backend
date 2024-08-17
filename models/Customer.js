const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const CustomerSchema = new mongoose.Schema({
    username: {
        type:String
    },

    time:{
        type :String
    },
    medic: {
        type : String,
    },
});

CustomerSchema.plugin(passportLocalMongoose);

const Cus = mongoose.model("Cus", CustomerSchema);

module.exports = Cus;

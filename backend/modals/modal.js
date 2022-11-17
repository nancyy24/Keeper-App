const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const keeperSchema = new Schema({
    title: String,
    description: String
})

const Keeper = new mongoose.model("Keeper", keeperSchema,"Keepers")

module.exports = Keeper;

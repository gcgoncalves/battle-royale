const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const playerSchema = new Schema({
  id: {type: String, unique: true},
  name: {type: String, unique: true, required: true, maxLength: 20},
  gold: {type: Number, default: 0, min: 0, max: 1000000000},
  attack: {type: Number, default: 30, min: 1, max: 100},
  hp: {type: Number, default: 30, min: 1, max: 100},
  luck: {type: Number, default: 30, min: 1, max: 100},
});
 
module.exports = mongoose.model("Player", playerSchema);
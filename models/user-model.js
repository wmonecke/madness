const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, minlength: 4, required: true},
  encryptedPassword: {type: String, minlength: 5, required: true},
  gender: {type: String},
  weight: {type: Number},
  metric: {type: String}, //If 1, uses KG
  goal: {type: String},
  workoutsDone: {type: Array},
  isProfileNew: {type: Boolean}
  
}, {

  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

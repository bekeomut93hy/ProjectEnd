const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema({
  email: String,
  name: String,
  age: Date,
  introduce: String,
  sex: String,
  title: String,
  school: String,
  avatarUrl: String,
  contact: String,
  fbId: String,
  createdAt: {
    type: Date,
    default: new Date().toUTCString()
  },
  OTP: {
    type: String,
    required: true,
    default: "000000"
  },
  verify: {
    type: Boolean,
    required: true,
    default: false
  },
  Like: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, date: Date }],
  Liked: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, date: Date }],
});
const UserModel = mongoose.model('User', user);
module.exports = UserModel;
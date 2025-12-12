const { Schema } = require("mongoose");
const passport = require("passport");

const Auth = new Schema({
  email: String,
  password: String
});

module.exports = { Auth };
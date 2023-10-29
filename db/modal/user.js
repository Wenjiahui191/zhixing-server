const mongoose = require("../mongo");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: String,
    nickname: String,
  },
  { versionKey: false }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;

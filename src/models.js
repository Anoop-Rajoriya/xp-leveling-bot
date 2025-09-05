const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  serverId: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  lastMessageAt: {
    type: Date,
    default: null,
  },
});

userSchema.index({ userId: 1, serverId: 1 }, { unique: true });

module.exports = {
  User: mongoose.model("User", userSchema),
};

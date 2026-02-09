import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    tgId: {
      type: Number,
      required: [true, "TgId - обязательное поле"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "userVip", "admin"],
      default: "user",
    },
    tokenBalance: {
      type: Number,
      default: 5000,
    },
    countMessages: {
      type: Number,
      default: 0,
    },
    spentTokens: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: new Date(Date.now() + 2592000000),
    },
  },
  {
    timeStamp: true,
  },
);

export const User = model("User", userSchema);

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
  },
  {
    timeStamp: true,
  },
);

export const User = model("User", userSchema);

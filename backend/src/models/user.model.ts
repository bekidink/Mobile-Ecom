const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
      validate: {
        validator: (value: string | any[]) => typeof value === "string" && value.length <= 255,
        message: "Email must be a string with a maximum length of 255.",
      },
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
      validate: {
        validator: (value: string | any[]) => typeof value === "string" && value.length <= 255,
        message: "Password must be a string with a maximum length of 255.",
      },
    },
    role: {
      type: String,
      required: true,
      default: "user",
      maxlength: 255,
      validate: {
        validator: (value: string | any[]) => typeof value === "string" && value.length <= 255,
        message: "Role must be a string with a maximum length of 255.",
      },
    },
    name: {
      type: String,
      maxlength: 255,
      validate: {
        validator: (value: string | any[] | undefined) =>
          value === undefined ||
          (typeof value === "string" && value.length <= 255),
        message: "Name must be a string with a maximum length of 255.",
      },
    },
    address: {
      type: String,
      validate: {
        validator: (value: undefined) => value === undefined || typeof value === "string",
        message: "Address must be a string.",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User

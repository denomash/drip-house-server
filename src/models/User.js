import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
  role: String,
});

const User = mongoose.model("User", UserSchema, "users");

export default User;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Hash Password before saving to DB
schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Verify Password
schema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(this.password, password);
};

// Generate Authentication Token
schema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id }, process.env.SECRET);
  return token;
};

export default mongoose.model("User", schema);

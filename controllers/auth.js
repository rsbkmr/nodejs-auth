import User from "../models/User.js";
import { loginValidator, registerValidator } from "../validators/user.js";

const register = async (req, res) => {
  // Validation
  const { value, error } = registerValidator(req.body);
  if (error) return res.status(403).json({ error: error.message });
  const userExist = await User.findOne({ email: value.email });
  if (userExist) return res.status(403).json({ error: "User already exist" });

  // Create User and Send Token
  const user = new User(value);
  const token = user.generateAuthToken();
  await user.save();
  res.json({ token });
};

const login = async (req, res) => {
  // Validation
  const { value, error } = loginValidator(req.body);
  if (error) return res.status(400).json({ error: error.message });
  console.log(error.message);

  // Find User and Send Token
  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(403).json({ error: "User not exist" });
  const token = user.generateAuthToken();
  res.json({ token });
};

export { register, login };

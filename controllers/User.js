import Router from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = Router();

//create user
router.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  var salt = bcrypt.genSaltSync(10);
  var hash = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({ name, email, password: hash });
    const accessToken = jwt.sign({ user }, "MySecretKey");
    res.cookie("token", accessToken, { httpOnly: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("user not found");
  }
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    res.status(401).send("invalid credentials");
  } else {
    const accessToken = jwt.sign({ user }, "MySecretKey");
    res.cookie("token", accessToken, { httpOnly: true });
    const { password, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  }
});

export default router;

//signup

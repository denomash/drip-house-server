import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/User";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user email && password
    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }
    // Check if user exist
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.SECERY_KEY,
        {
          expiresIn: "4h",
        }
      );

      // save user token
      user.token = token;

      // user
      const userInfo = {
        userId: user._id,
        email: user.email,
        token: user.token,
      };
      return res.status(200).json({ ...userInfo });
    }
    res.status(401).json({ message: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
  }
};

export { login };

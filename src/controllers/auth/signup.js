import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/User";

const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate user input
    if (!(name && email && password)) {
      res.status(400).send("Name, email and password are required!");
    }

    // Check if user exists
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      role: Role.USER,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { usedId: user._id, email },
      process.env.SECERY_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    delete user.password;

    // return new user
    res.status(201).json({
      name: user.name,
      email: user.email,
      role: user.role,
      token: user.token,
    });
  } catch (err) {
    console.log(err);
  }
};

export { signup };

import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECERY_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

export default verifyToken;

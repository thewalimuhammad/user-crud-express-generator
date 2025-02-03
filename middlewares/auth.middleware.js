import pkg from "jsonwebtoken";
const { verify, sign } = pkg;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Not authorized, no token" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7, authHeader.length)
    : authHeader;

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Not authorized, token failed" });
  }
};

const verifyToken = (token) => {
  return verify(token, process.env.JWT_SECRET);
};

const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export { authMiddleware, generateToken };

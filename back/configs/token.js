const jwt = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "2h" });

  return token;
};

function validateToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, validateToken };

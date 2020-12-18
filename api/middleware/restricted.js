const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../auth/secret");

module.exports = (req, res, next) => {
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

  // pull the token from header
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "token required"});
  } else {
    // verify the token provided
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json("token invalid");
      } else {
        // since token valid and not expired 
        // tack the decoded token to req and proceed
        req.decodedToken = decoded; //what is this for??
        next();
      }
    });
  }
};

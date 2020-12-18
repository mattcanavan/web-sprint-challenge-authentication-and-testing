require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET || "ihaveheardwhatthetalkersweretalking";

module.exports = {
  jwtSecret,
};
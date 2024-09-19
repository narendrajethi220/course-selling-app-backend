const { User } = require("../db/index");

function userMiddleware(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  //checking if user present or not in the database
  User.findOne({
    username: username,
    password: password,
  }).then(function (value) {
    if (value) {
      next();
    } else {
      res.status(403).json({
        msg: "Check your username or password",
      });
    }
  });
}
module.exports = userMiddleware;

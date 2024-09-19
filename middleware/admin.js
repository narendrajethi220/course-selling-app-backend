const { Admin } = require("../db/index");

function adminMiddleware(req, res, next) {
  // admin auth login
  // we need to check the headers and validate the admin form the admin DB.
  const username = req.headers.username;
  const password = req.headers.password;
  //checking if admin present or not in the database
  Admin.findOne({
    username: username,
    password: password,
  }).then(function (value) {
    if (value) {
      next();
      // let the controll reach to the next part i.e.,post-- /admin/courses. get --/admin/courses
    } else {
      res.status(403).json({
        msg: "Check your username or password",
      });
    }
  });
}
module.exports = adminMiddleware;

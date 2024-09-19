const express = require("express");
const bodyParse = require("body-parser");
/*
body-parser is used in backend applications to parse the incoming request bodies, especially in POST and PUT requests. It helps extract data from forms or JSON objects and makes it available in req.body. For example, when a client sends JSON data, body-parser converts it into a JavaScript object.
*/

const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

//Middleware for parsing request bodies
app.use(bodyParse.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`💾 is 🚀 on port ${PORT}`);
});

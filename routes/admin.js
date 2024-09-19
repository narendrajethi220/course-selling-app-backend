const { Router } = require("express");
// const express = require("express");
const { Admin, Course } = require("../db/index");
const adminMiddleware = require("../middleware/admin");

const router = Router();
router.post("/signup", async (req, res) => {
  //admin signup logic here
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username: username,
    password: password,
  });

  // only if the user is created then only control reach to successfull message and if there is an
  // error status code will be 500 (if any exception)
  res.json({
    message: "Admin created successfully",
  });
});

//check if a user with this username already exists
// let assume user has not created the any account earlier
/* 
  Admin.create({
    username: username, //username
    password: password, // password
  })
    .then(function () {
      res.json({
        message: "Admin created successfully",
      });
    })
    //lets assume no error happens but we have to check here
    .catch(function () {
      res.json({
        message: "Error in creating User",
      });
    });
});

*/

router.post("/courses", adminMiddleware, async (req, res) => {
  // course creation logic here
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;
  const newCourse = await Course.create({
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });
  // console.log(newCourse);
  res.json({
    msg: "Course Created Successfully",
    courseId: newCourse.id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  //fetching all course logic
  // One way of doing it
  // Course.find({}).then(function (response) {
  //   res.json({
  //     course: response,
  //   });
  // });
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});
module.exports = router;

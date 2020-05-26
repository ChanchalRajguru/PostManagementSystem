//Imports use require keyword
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

//execute the express package as a function and store it in a constant variable
const app = express();

mongoose
  .connect(
    "mongodb+srv://adminChanchal:48SkGQcCCnzV8rE@cluster0-kcqcn.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection Failed!!");
  });

//Middleware for parsing JSON data
app.use(bodyParser.json());

//To parse Middleware encoded data
app.use(bodyParser.urlencoded({ extended: false })); // 'extended: false' only supports the default encoding

app.use((req, res, next) => {
  // * (star) mean allow access from all domains 4000, 4001,...
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Allows these headers requested from the domain
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  //
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

/* An Express app is a big chain of middlewares, that we apply to incoming requests
in that funnel we have different parts and every part can do something with
the request like manipulate it, read values from it or do something with the response or send the response.
 */

/* the request will not go to the next middlewares in the file as its
not using the next function */

app.post("/api/posts", (req, res, next) => {
  //body is a new field added by bodyparser package
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({
    message: "Post added successfully!!",
  });
});

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "127hfgh632jK18",
      title: "First server-side post",
      content: "This is coming from the server",
    },
    {
      id: "AP32647ggH009",
      title: "Second server-side post",
      content: "This is coming from the server",
    },
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts,
  });
});

module.exports = app;

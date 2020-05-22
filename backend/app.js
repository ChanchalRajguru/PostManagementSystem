//Imports use require keyword
const express = require("express");

//execute the express package as a function and store it in a constant variable
const app = express();

/* An Express app is a big chain of middlewares, that we apply to incoming requests
in that funnel we have different parts and every part can do something with
the request like manipulate it, read values from it or do something with the response or send the response.
 */
//Use the app middleware
/* Note in the app middleware we need to either send a response or do next()
for the request to pass on to the bottom middlewares */
// app.use((req, res, next)=> {
//   console.log("First middlwware");
//   next();
// });

/* the request will not go to the next middlewares in the file as its
not using the next function */
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

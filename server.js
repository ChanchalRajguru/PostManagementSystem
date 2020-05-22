const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

// An function to ensure that the port recieved from a environment variable is of valid number
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// An function which will log which type of error occured
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// A function to log that we are listening to incoming requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port); // Setting the port on the express app

// A server to listen to the node app
const server = http.createServer(app);
/* Registering two listeners (onError and onListening) */
server.on("error", onError); // to check if something went wrong when starting the server
server.on("listening", onListening); // to check if everything went on smoothly.
server.listen(port); // start the server

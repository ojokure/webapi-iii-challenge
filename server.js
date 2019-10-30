const express = require("express");

const userRouter = require("./users/userRouter");

const helmet = require("helmet");

const server = express();

function logger(req, res, next) {
  console.log(
    `${req.method} to ${req.originalUrl} [${new Date().toISOString()}] `
  );

  next();
}

server.use(logger);
server.use(helmet());
server.use(express.json());
server.use("/api/users", userRouter);
server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   console.log(`${req.method} ${req.originalUrl}`);

//   next();
// }

module.exports = server;

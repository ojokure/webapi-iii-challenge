const express = require("express");

const helmet = require("helmet");

const server = express();


function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl} ${req.headers['Date']}`);

  next();
}

server.use(logger)
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   console.log(`${req.method} ${req.originalUrl}`);

//   next();
// }

module.exports = server;

const express = require("express");

const Users = require("./userDb");
const Posts = require("../posts/postDb")

const router = express.Router();

router.post("/", validatePost, (req, res) => {
  Users.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

router.post("/:id/posts", [validateUserId, validatePost], (req, res) => {
  const postData = { ...req.body, user_id: req.params.id };
  
    Posts.insert(postData)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

// router.get('/', (req, res) => {

// });

// router.get('/:id', (req, res) => {

// });

// router.get('/:id/posts', (req, res) => {

// });

// router.delete('/:id', (req, res) => {

// });

// router.put('/:id', (req, res) => {

// });

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({
        message: "invalid user id"
      });
    }
  });
}
function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing user data!" });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required "name" field!' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing user data!" });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    });
  } else {
    next();
  }
}

module.exports = router;

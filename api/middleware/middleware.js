const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = Date.now();
  console.log(`${req.method} ${req.url} ${timestamp}`);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const id = req.params.id;
  Users.getById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => {
      res.status(404).json({ message: 'user not found'});
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
}
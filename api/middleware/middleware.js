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
      if(!user){
        res.status(404).json({message: 'user not found'});
      } else {
        req.user = user;
        next();
      }
    })
    .catch(() => {
      res.status(500).json({message: 'failed to validate user id'});
    })
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.name) {
    res.status(400).json({message: 'missing required name field'});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.text) {
    res.status(400).json({message: 'missing required text field'});
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validatePost,
  validateUser,
  validateUserId,
}
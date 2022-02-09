const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
// The middleware functions also need to be required
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      console.log(users);
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({message: 'Error retrieving the users'});
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500);
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({message: 'failed to update user'});
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  let toDelete = {};
  Users.getById(id)
    .then(user => {
      toDelete = user;
    })
    .catch(() => {
      res.status(500).json({message: 'failed to get user'});
    })
  Users.remove(req.params.id)
    .then(count => {
      if(count > 0) {
        res.status(200).json(toDelete);
      }
    })
    .catch(() => {
      res.status(500).json({message: 'failed to remove user'});
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  Users.getUserPosts(id)
    .then(posts => {
      if(posts == null || posts.length === 0){
        res.status(404).json({message: 'no posts found'});
      } else {
        res.json(posts);
      }
    })
    .catch(() => {
      res.status(500).json({message: 'failed to get post'});
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(() => {   
      res.status(500).json({message: 'failed to post'});
    })
});

// do not forget to export the router
module.exports = router;
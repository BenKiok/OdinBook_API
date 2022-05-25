const Post = require('../models/Post'),
      User = require('../models/User'),
      {body, validationResult} = require('express-validator');

exports.get_post_GET = (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }

    return res.json(post);
  })
}

exports.new_post_POST = [
  body('body').notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(err);
    } else {
      User.findById(req.params.id, (err, user) => {
        if (err) {
          return next(err);
        }

        const post = new Post(
          {
            body: req.body.body,
            date: Date.now(),
            comments: [],
            likes: 0,
            user
          }
        )

        post.save((err, post) => {
          if (err) {
            return next(err);
          }

          return res.json(post);
        })
      })
    }
  }
]

exports.edit_post_PUT = [
  body('body').notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(err);
    } else {
      Post.findByIdAndUpdate(
        {
          body: req.body.body,
          date: Date.now()
        },
        (err, post) => {
          if (err) {
            return next(err);
          }

          return res.json(post);
        }
      )
    }
  }
]

exports.delete_post_DELETE = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }
    
    return res.json(post);
  })
}
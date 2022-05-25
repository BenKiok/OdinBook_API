const Comment = require('../models/Comment'),
      User = require('../models/User'),
      {body, validationResult} = require('express-validator');

exports.get_comment_GET = (req, res, next) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) {
      return next(err);
    }

    return res.json(comment);
  })
}

exports.new_comment_POST = [
  body('body').notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(req.body);
    } else {
      User.findById(req.params.user, (err, user) => {
        if (err) {
          return next(err);
        }

        const comment = new Comment(
          {
            body: req.body.body,
            date: Date.now(),
            user
          }
        )

        comment.save((err, comment) => {
          if (err) {
            return next(err);
          }

          return res.json(comment);
        })
      })
    }
  }
]

exports.edit_comment_PUT = [
  body('body').notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(req.body);
    } else {
      Comment.findById(
        req.params.id,
        {
          body: req.body.body,
          date: Date.now()
        },
        (err, comment) => {
          if (err) {
            return next(err);
          }

          return res.json(comment);
        }
      )
    }
  }
]

exports.delete_comment_DELETE = (req, res, next) => {
  Comment.findByIdAndDelete(req.params.id, (err, comment) => {
    if (err) {
      return next(err);
    }

    return res.json(comment);
  })
}
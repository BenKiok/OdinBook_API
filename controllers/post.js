const Post = require('../models/Post'),
      User = require('../models/User'),
      {body, validationResult} = require('express-validator');

exports.get_post_GET = (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }

    return res.json(post);
  });
}

exports.new_post_POST = [
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
        });
      });
    }
  }
]

exports.edit_post_PUT = [
  body('body').notEmpty().trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json(req.body);
    } else {
      Post.findByIdAndUpdate(
        req.params.id,
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
      );
    }
  }
]

exports.like_post_PUT = (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }

    User.findById(req.params.user, (err, user) => {
      if (err) {
        return next(err);
      }

      post.likedBy.push(user);

      Post.findByIdAndUpdate(post._id, {likedBy: post.likedBy}, (err, post) => {
        if (err) {
          return next(err);
        }
        
        return res.json(post);
      });
    }); 
  });
}

exports.unlike_post_PUT = (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }

    post.likes -= 1;

    Post.findByIdAndUpdate(post._id, {likes: post.likes}, (err, post) => {
      if (err) {
        return next(err);
      }

      return res.json(post);
    });
  });
}

exports.delete_post_DELETE = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (err) {
      return next(err);
    }

    return res.json(post);
  });
}

exports.timeline_GET = (req, res, next) => {
  return (async () => {
    const user = await User.findById(req.params.user).exec();
    let timeline = [], arr;

    // collect posts from user
    arr = await Post.find({user}).populate('comments').exec();
    timeline.push(...arr);

    // collect posts from each friend of user
    const friends = user.friends;
    for (const i in user.friends) {
      arr = await Post.find({user: friends[i]}).populate('comments').exec();
      timeline.push(...arr);
    }

    // organize by date newest to oldest
    timeline = timeline.sort((a, b) => b.date - a.date);

    // return array of posts
    return res.json(timeline);
  })();
}
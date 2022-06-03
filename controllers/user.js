const User = require('../models/User');

exports.new_friendrequest_PUT = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return next(err);
    }

    user.friendRequestsFrom.unshift(req.params.user);

    User.findByIdAndUpdate(user._id, {friendRequestsFrom: user.friendRequestsFrom}, (err, user) => {
      if (err) {
        return next(err);
      }

      return res.json(user);
    });
  });
}

exports.new_friend_PUT = (req, res, next) => {
  User.findById(req.params.user, (err, user) => {
    if (err) {
      return next(err);
    }

    const requestArr = user.friendRequestsFrom.filter(id => String(id) !== String(req.params.id));
    user.friends.unshift(req.params.id);

    User.findByIdAndUpdate(user._id, {friendRequestsFrom: requestArr, friends: user.friends}, (err, user) => {
      if (err) {
        return next(err);
      }

      User.findById(req.params.id, (err, friend) => {
        if (err) {
          return next(err);
        }

        friend.friends.unshift(user._id);

        User.findByIdAndUpdate(friend._id, {friends: friend.friends}, (err, friend) => {
          if (err) {
            return next(err);
          }

          return res.json({user, friend});
        });
      });
    });
  });
}

exports.remove_friendrequest_PUT = (req, res, next) => {
  User.findById(req.params.user, (err, user) => {
    if (err) {
      return next(err);
    }

    const requestArr = user.friendRequestsFrom.filter(id => String(id) !== String(req.params.id));

    User.findByIdAndUpdate(user._id, {friendRequestsFrom: requestArr}, (err, user) => {
      if (err) {
        return next(err);
      }

      return res.json(user);
    });
  });
}

exports.remove_friend_PUT = (req, res, next) => {
  User.findById(req.params.user, (err, user) => {
    if (err) {
      return next(err);
    }

    const friendArr = user.friends.filter(id => String(id) !== String(req.params.id));

    User.findByIdAndUpdate(user._id, {friends: friendArr}, (err, user) => {
      if (err) {
        return next(err);
      }

      User.findById(req.params.id, (err, exfriend) => {
        if (err) {
          return next(err);
        }

        const otherFriendArr = exfriend.friends.filter(id => String(id) !== String(user._id));

        User.findByIdAndUpdate(exfriend._id, {friends: otherFriendArr}, (err, exfriend) => {
          if (err) {
            return next(err);
          }

          return res.json({user, exfriend});
        });
      });
    });
  });
}
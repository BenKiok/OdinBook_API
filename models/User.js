const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    postsLiked: [
      {type: Schema.Types.ObjectId, ref: 'Post'}
    ],
    friendRequestsFrom: [
      {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    friends: [
      {type: Schema.Types.ObjectId, ref: 'User'}
    ]
  }
);

module.exports = mongoose.model('User', userSchema);
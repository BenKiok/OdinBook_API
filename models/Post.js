const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    body: {type: String, required: true},
    date: {type: Number, required: true},
    comments: [
      {type: Schema.Types.ObjectId, ref: 'Comment'}
    ],
    likedBy: [
      {type: Schema.Types.ObjectId, ref: 'User'}
    ],
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  }
);

module.exports = mongoose.model('Post', postSchema);
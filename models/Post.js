const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    body: {type: String, required: true},
    date: {type: Number, required: true},
    comments: [
      {type: Schema.Types.ObjectId, ref: 'Comment'}
    ],
    likes: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  }
);

module.exports = mongoose.model('Post', postSchema);
const express = require('express'),
      router = express.Router(),
      post_controller = require('../controllers/post');

router.post(':user/new/post', post_controller.new_post_POST);
router.put('/post/:id/edit', post_controller.edit_post_PUT);
router.delete('/post/:id/delete', post_controller.delete_post_DELETE);
router.get('/post/:id', post_controller.get_post_GET);

// router.post('comment/new', comment_controller.new_comment_GET);
// router.put('comment/:id/edit', comment_controller.edit_comment_PUT);
// router.delete('comment/:id/delete', comment_controller.delete_comment_DELETE);
// router.get('comment/:id', comment_controller.get_comment_GET);

module.exports = router;
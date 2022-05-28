const express = require('express'),
      router = express.Router(),
      post_controller = require('../controllers/post'),
      user_controller = require('../controllers/user'),
      comment_controller = require('../controllers/comment');

router.post('/:user/new/post', post_controller.new_post_POST);
router.post('/:user/new/comment/for_post/:id', comment_controller.new_comment_POST);
router.put('/:user/new/friendrequestto/:id', user_controller.new_friendrequest_PUT);
router.put('/:user/new/friend/:id', user_controller.new_friend_PUT);
router.put('/:user/remove/friendrequestfrom/:id', user_controller.remove_friendrequest_PUT);
router.put('/:user/remove/friend/:id', user_controller.remove_friend_PUT);

router.put('/post/:id/edit', post_controller.edit_post_PUT);
router.put('/post/:id/like', post_controller.like_post_PUT);
router.put('/post/:id/unlike', post_controller.unlike_post_PUT);
router.delete('/post/:id/delete', post_controller.delete_post_DELETE);
router.get('/post/:id', post_controller.get_post_GET);

router.put('/comment/:id/edit', comment_controller.edit_comment_PUT);
router.delete('/comment/:id/delete/from_post/:post', comment_controller.delete_comment_DELETE);
router.get('/comment/:id', comment_controller.get_comment_GET);

module.exports = router;
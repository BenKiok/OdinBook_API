const express = require('express'),
      router = express.Router(),
      auth_controller = require('../controllers/auth');

router.post('/signup', auth_controller.user_signup_POST);
router.post('/login', auth_controller.user_login_POST);

module.exports = router;
const express = require('express');

const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  forgetpassword,
  resetpassword,
  updatedetails,
  updatepassword
} = require('../controllers/auth');
const { protect } = require('../middleware/protect');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgetpassword', forgetpassword);
router.patch('/resetpassword/:token', resetpassword);

router.route('/me').get(protect, getMe);
router.route('/updatedetails').patch(protect, updatedetails);
router.route('/updatepassword').patch(protect, updatepassword);

module.exports = router;

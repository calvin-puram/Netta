const express = require('express');
const {
  getUsers,
  getOneUsers,
  updateUsers,
  createUsers,
  deleteUsers
} = require('../controllers/users');

const router = express.Router();

const { protect, authorize } = require('../middleware/protect');

//advance results
const Users = require('../models/User');
const advanceResults = require('../middleware/advanceResults');

router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advanceResults(Users), getUsers)
  .post(createUsers);
router
  .route('/:id')
  .get(getOneUsers)
  .patch(updateUsers)
  .delete(deleteUsers);

module.exports = router;

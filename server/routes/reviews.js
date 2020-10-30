const express = require('express');

const router = express.Router({ mergeParams: true });

const {
  getReviews,
  getOneReview,
  CreateReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews');

const { protect, authorize } = require('../middleware/protect');

//advance results
const Reviews = require('../models/Reviews');
const advanceResults = require('../middleware/advanceResults');

router
  .route('/')
  .get(
    advanceResults(Reviews, {
      path: 'bootcamp',
      select: 'name, description'
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), CreateReview);

router
  .route('/:id')
  .get(getOneReview)
  .patch(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview);

module.exports = router;

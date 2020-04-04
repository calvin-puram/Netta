const express = require('express');
const {
  getBootcamps,
  getOneBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  getBootcampsByRadius,
  fileupload
} = require('../controllers/bootcamps');

const { protect, authorize } = require('../middleware/protect');

//advance results
const Bootcamps = require('../models/Bootcamps');
const advanceResults = require('../middleware/advanceResults');

//include other resource router
const coursesRouter = require('./course');
const reviewsRouter = require('./reviews');

const router = express.Router();
//re-route to course route
router.use('/:bootcampId/courses', coursesRouter);
router.use('/:bootcampId/reviews', reviewsRouter);

router.route('/radius/:distance/:lng/:lat/:unit').get(getBootcampsByRadius);
router
  .route('/:id/photo')
  .patch(protect, authorize('publisher', 'admin'), fileupload);
router
  .route('/')
  .get(advanceResults(Bootcamps, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamps);
router
  .route('/:id')
  .get(getOneBootcamps)
  .patch(protect, authorize('publisher', 'admin'), updateBootcamps)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamps);

module.exports = router;

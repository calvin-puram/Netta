const path = require('path');
const Bootcamps = require('../models/Bootcamps');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc       Get All Bootcamps
//@route      Get api/v1/bootcamps
//@access     public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults);
});

//@desc       Get One Bootcamps
//@route      Get api/v1/bootcamps/:id
//@access     public
exports.getOneBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp
  });
});

//@desc       Create  Bootcamps
//@route      POST api/v1/bootcamps/
//@access     private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  //get the publisher via the req
  req.body.user = req.user.id;
  const publishedBootcamps = await Bootcamps.findOne({ user: req.user.id });

  // published one bootcamp if not admin
  if (publishedBootcamps && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `the user ${req.user.name} has already published a bootcamp`,
        400
      )
    );
  }

  const bootcamp = await Bootcamps.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp
  });
});

//@desc       Update Bootcamps
//@route      PUT api/v1/bootcamps/:id
//@access     private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamps.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }
  //check if he is not the publisher or admin
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `the user ${req.user.name} is not authorize to perform this action`,
        401
      )
    );
  }

  bootcamp = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: bootcamp
  });
});

//@desc       Delete Bootcamps
//@route      Delete api/v1/bootcamps/:id
//@access     private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }

  //check if he is not admin or the publisher
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `the user ${req.user.name} is not authorize to perform this action`,
        401
      )
    );
  }
  bootcamp.remove();

  res.status(204).json({
    success: true,
    data: null
  });
});

//@desc       GET Bootcamps by Radius
//@route      Delete api/v1/bootcamps/radius/:distance/:lng/:lat/:unit
//@access     private
exports.getBootcampsByRadius = asyncHandler(async (req, res, next) => {
  const { distance, unit, lng, lat } = req.params;

  if (!lat || !lng) {
    return next(
      new ErrorResponse('please provide latitude and longitude', 404)
    );
  }

  const radius = unit === 'km' ? distance / 6371 : distance / 39588;

  const bootcamps = await Bootcamps.find({
    location: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] }
    }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    bootcamps
  });
});

//@desc       upload Bootcamps image
//@route      Patch api/v1/bootcamps/:id/photo
//@access     private
exports.fileupload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No Resource found with this id: ${req.params.id}`, 404)
    );
  }

  //check if he is not admin or the publisher
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `the user ${req.user.name} is not authorize to perform this action`,
        401
      )
    );
  }
  //check if file exists
  if (!req.files) {
    return next(new ErrorResponse(`please upload a file`, 400));
  }

  const { file } = req.files;
  //check if the file is an image
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`please upload an image file`, 400));
  }

  //check if file size is more than 1mb
  if (file.size > process.env.FILE_UPLOADS_SIZE) {
    return next(
      new ErrorResponse(`image file size must not be more than 1mb`, 400)
    );
  }

  //create custom file name
  file.name = `photo-${bootcamp._id}${path.parse(file.name).ext}`;

  //store the file
  file.mv(`${process.env.FILE_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`problem with image upload`, 500));
    }
    //save filename to db
    await Bootcamps.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

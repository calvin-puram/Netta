const Users = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc       Get All Users
//@route      GET api/v1/auth/users
//@access     private
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advanceResults);
});

//@desc       Get One Users
//@route      Get api/v1/auth/users/:id
//@access     private
exports.getOneUsers = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`no user found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc       create Users
//@route      POST api/v1/auth/users/
//@access     private
exports.createUsers = asyncHandler(async (req, res, next) => {
  const user = await Users.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

//@desc       update Users
//@route      PATCH api/v1/auth/users/:id
//@access     private
exports.updateUsers = asyncHandler(async (req, res, next) => {
  const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc       delete Users
//@route      DELETE api/v1/auth/users/:id
//@access     private
exports.deleteUsers = asyncHandler(async (req, res, next) => {
  await Users.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

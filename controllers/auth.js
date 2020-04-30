const crypto = require('crypto');
const Users = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const SendEmail = require('../utils/email');

//send token via cookie and response body
const sendToken = async function(user, statusCode, res) {
  const token = await user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      data: {
        token,
        user
      }
    });
};

//@desc       POST Create Users
//@route      POST api/v1/auth/register
//@access     public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, passwordConfirm } = req.body;

  const user = await Users.create({
    name,
    email,
    password,
    passwordConfirm,
    role
  });
  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/bootcamps'
      : 'https://devcoaching.herokuapp.com/bootcamps';
  await new SendEmail(user, url).sendWelcome();
  sendToken(user, 200, res);
});

//@desc       POST login Users
//@route      POST api/v1/auth/login
//@access     public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse('email and password fields are required', 400)
    );
  }

  const user = await Users.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(user.password, password))) {
    return next(
      new ErrorResponse(
        'Invalid Credencials or email not Registered on this platform',
        401
      )
    );
  }

  sendToken(user, 200, res);
});

//@desc     logout Users / clear token
//@route    Get api/v1/auth/logout
//@access   private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

//@desc       Get logged in Users
//@route      GET api/v1/auth/me
//@access     private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await Users.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc       forget password
//@route      POST api/v1/auth/forgetpassword
//@access     public
exports.forgetpassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorResponse('email is required', 400));
  }

  const user = await Users.findOne({ email });

  if (!user) {
    return next(
      new ErrorResponse('this email is not registered on this platform', 404)
    );
  }

  const resetToken = user.sendResetToken();

  await user.save({ validateBeforeSave: false });

  try {
    const replyURL =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:8080/resetpassword/${resetToken}`
        : `https://devcoaching.herokuapp.com/resetpassword/${resetToken}`;
    await new SendEmail(user, replyURL).passwordReset();

    res.status(200).json({
      success: true,
      data: 'reset password email sent successfully'
    });
  } catch (err) {
    console.log(`Email: ${err}`);
    user.forgetPasswordResetToken = undefined;
    user.forgetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorResponse('your email could not be sent. try again', 500)
    );
  }
});

//@desc       reset password
//@route      PATCH api/v1/auth/resetpassword/:token
//@access     public
exports.resetpassword = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await Users.findOne({
    forgetPasswordResetToken: hashedToken,
    forgetPasswordExpires: { $gte: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid Token or Token has Expired', 400));
  }

  try {
    if (req.body.password !== req.body.passwordConfirm) {
      return next(new ErrorResponse('Password do not match', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.forgetPasswordResetToken = undefined;
    user.forgetPasswordExpires = undefined;
    await user.save();

    sendToken(user, 200, res);
  } catch (err) {
    console.log(err.message);
  }
});

//@desc       update user details
//@route      PATCH api/v1/auth/updatedetails
//@access     private
exports.updatedetails = asyncHandler(async (req, res, next) => {
  const updateFields = {
    email: req.body.email,
    name: req.body.name
  };
  const user = await Users.findByIdAndUpdate(req.user.id, updateFields, {
    new: true,
    runValidators: true
  });

  user.password = undefined;
  sendToken(user, 200, res);
});

//@desc       update user password
//@route      PATCH api/v1/auth/updatepassword
//@access     private
exports.updatepassword = asyncHandler(async (req, res, next) => {
  if (req.body.newPassword !== req.body.passwordConfirm) {
    return next(new ErrorResponse('Password do not match', 400));
  }
  const { currentPassword, newPassword, passwordConfirm } = req.body;
  if (!currentPassword || !newPassword || !passwordConfirm) {
    return next(new ErrorResponse('All fields are required', 400));
  }

  const user = await Users.findById(req.user.id).select('+password');

  if (!(await user.comparePassword(user.password, currentPassword))) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }

  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  sendToken(user, 200, res);
});

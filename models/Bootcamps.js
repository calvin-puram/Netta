const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const { Schema } = mongoose;

const BootcampSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'name must no be more than 50 characters long']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'please add a description'],
      maxlength: [500, 'description must no be more than 500 characters long']
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'please use a valid URL with HTTP or HTTPS'
      ]
    },
    phone: {
      type: String,
      required: [20, 'phone number must not be longer than 20 characters']
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'please add a valid email']
    },
    address: {
      type: String,
      required: [true, 'please add an address']
    },
    location: {
      //GEOJSON
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String
    },
    careers: {
      type: [String],
      required: true,
      enum: {
        values: [
          'Web Development',
          'Mobile Development',
          'UI/UX',
          'Data Science',
          'Business',
          'Others'
        ],
        message: 'please use the right keywords'
      }
    },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating cannot be more than  10']
    },
    averageCost: Number,
    photo: {
      type: String,
      default: 'no-photo.jpg'
    },
    housing: {
      type: Boolean,
      default: false
    },
    jobAssistance: {
      type: Boolean,
      default: false
    },
    jobGuarantee: {
      type: Boolean,
      default: false
    },
    acceptGi: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// add slug before save
BootcampSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {
    replacement: '-',
    lower: true
  });
  next();
});

// setup location using the address provided
BootcampSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };
  this.address = undefined;

  next();
});

//on delete cascade
BootcampSchema.pre('remove', async function(next) {
  await this.model('Courses').deleteMany({ bootcamp: this._id });
  next();
});

//reverse populate with virtuals
BootcampSchema.virtual('courses', {
  ref: 'Courses',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false
});

const Bootcamps = mongoose.model('Bootcamps', BootcampSchema);
module.exports = Bootcamps;

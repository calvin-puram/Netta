const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'please add a title'],
    maxlength: 500
  },
  text: {
    type: String,
    required: [true, 'please add a text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'please add a rating']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: Schema.Types.ObjectId,
    ref: 'Bootcamps',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

ReviewsSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// ReviewsSchema.statics.getAverageRating = async function(bootcampId) {
//   const avgRating = await this.aggregate([
//     {
//       $match: { bootcamp: bootcampId }
//     },
//     {
//       $group: {
//         _id: '$bootcamp',
//         averageRating: { $avg: '$rating' }
//       }
//     }
//   ]);

//   try {
//     await this.model('Bootcamps').findByIdAndUpdate(bootcampId, {
//       averageRating: avgRating[0].averageRating
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// ReviewsSchema.post('save', function() {
//   this.constructor.getAverageRating(this.bootcamp);
// });

// ReviewsSchema.pre('remove', function(next) {
//   this.constructor.getAverageRating(this.bootcamp);
//   next();
// });

// calulate average ratings
ReviewsSchema.statics.calcRating = async function(bootcampId) {
  const stats = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: '$bootcamp',
        nRating: { $sum: 1 },
        averageRating: { $avg: '$rating' }
      }
    }
  ]);
  if (stats.length > 0) {
    await this.model('Bootcamps').findByIdAndUpdate(bootcampId, {
      averageRating: stats[0].averageRating,
      ratingsQuantity: stats[0].nRating
    });
  } else {
    await this.model('Bootcamps').findByIdAndUpdate(bootcampId, {
      ratingsAverage: 4.5,
      ratingsQuantity: 0
    });
  }
};

ReviewsSchema.post('save', function() {
  this.constructor.calcRating(this.bootcamp);
});

//update ratings average
ReviewsSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

ReviewsSchema.post(/^findOneAnd/, async function() {
  await this.r.constructor.calcRating(this.r.bootcamp);
});

const Reviews = mongoose.model('Reviews', ReviewsSchema);
module.exports = Reviews;

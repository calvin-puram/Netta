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

ReviewsSchema.statics.getAverageRating = async function(bootcampId) {
  const avgRating = await this.aggregate([
    {
      $match: { bootcamp: bootcampId }
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Bootcamps').findByIdAndUpdate(bootcampId, {
      averageRating: avgRating[0].averageRating
    });
  } catch (err) {
    console.log(err);
  }
};

ReviewsSchema.post('save', function(next) {
  this.constructor.getAverageRating(this.bootcamp);
});

ReviewsSchema.pre('remove', function(next) {
  this.constructor.getAverageRating(this.bootcamp);
});

const Reviews = mongoose.model('Reviews', ReviewsSchema);
module.exports = Reviews;

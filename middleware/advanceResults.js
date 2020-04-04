const advanceResults = (model, populate) => {
  return async (req, res, next) => {
    // 1) ADVANCE FILTERING
    const query = { ...req.query };
    const excluded = ['page', 'sort', 'fields', 'limit'];
    excluded.forEach(el => delete query[el]);
    const queryString = JSON.stringify(query).replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`
    );
    let filteredQuery = model.find(JSON.parse(queryString));

    // 2  SORTING
    if (req.query.sort) {
      const sortby = req.query.sort.split(',').join(' ');
      filteredQuery = filteredQuery.sort(sortby);
    } else {
      filteredQuery = filteredQuery.sort('createdAt');
    }

    // 3  FIELDS LIMITING
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      filteredQuery = filteredQuery.select(fields);
    } else {
      filteredQuery = filteredQuery.select('-__v');
    }

    // 4 PAGINATION
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    filteredQuery = filteredQuery.skip(startIndex).limit(limit);

    if (populate) {
      filteredQuery = filteredQuery.populate(populate);
    }

    // pagination result
    const paginate = {};
    if (endIndex < total) {
      paginate.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      paginate.prev = {
        page: page - 1,
        limit
      };
    }

    const results = await filteredQuery;

    res.advanceResults = {
      success: true,
      count: results.length,
      paginate,
      data: results
    };
    next();
  };
};

module.exports = advanceResults;

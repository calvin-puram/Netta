<template>
  <form>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            name="miles"
            placeholder="Enter Longitude"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            name="zipcode"
            placeholder="Enter Latitude"
          />
        </div>
      </div>
    </div>
    <input
      type="submit"
      value="Find Bootcamps"
      class="btn btn-primary btn-block"
    />
  </form>
</template>

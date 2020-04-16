<template>
  <section class="container mt-5" v-if="Object.keys(singleBootcamp).length > 0">
    <div class="row">
      <div class="col-md-8 m-auto">
        <div class="card bg-white py-2 px-4">
          <div class="card-body">
            <!-- back button -->
            <div>
              <!-- bootcamp has no course disable the button -->
              <v-btn
                class="my-3"
                v-if="singleBootcamp.courses.length === 0"
                color="teal"
                :disabled="singleBootcamp.courses.length === 0"
                link
                :to="
                  `/bootcamp/${singleBootcamp._id}/${singleBootcamp.slug}/manage_courses`
                "
              >
                <BaseIcon prop="fas fa-chevron-left mr-1" />Manage
                Courses</v-btn
              >

              <!-- if the bootcamp has courses -->
              <v-btn
                v-if="singleBootcamp.courses.length > 0"
                class="my-3"
                color="teal"
                dark
                link
                :to="
                  `/bootcamp/${singleBootcamp._id}/${singleBootcamp.slug}/manage_courses`
                "
              >
                <BaseIcon prop="fas fa-chevron-left mr-1" />Manage
                Courses</v-btn
              >
            </div>

            <div class="col-md-6 col-sm-12 mt-2">
              <h4 class="mb-2 text-secondary">{{ singleBootcamp.name }}</h4>
              <h4 class=" mb-4 text-secondary">Add Course</h4>
            </div>

            <v-form
              ref="form"
              v-model="valid"
              @submit.prevent="handleBootcampCourse"
            >
              <!-- title -->
              <v-text-field
                v-model="title"
                label="Course Title"
                :rules="titleRules"
                required
              ></v-text-field>

              <!-- duration -->
              <v-text-field
                v-model="duration"
                :rules="durationRules"
                label="Duration"
                hint="please enter number of weeks course lasts"
                required
              ></v-text-field>

              <!-- tuition -->
              <v-text-field
                v-model="tuition"
                :rules="tuitionRules"
                label="Tuition"
                hint="USD Currency"
                required
              ></v-text-field>

              <!-- skills requred -->
              <v-select
                v-model="minimumSkill"
                :items="items"
                chips
                label="Minimum Skill Required"
              ></v-select>

              <!-- description -->
              <v-textarea
                v-model="description"
                clearable
                :counter="500"
                clear-icon="cancel"
                required
                :rules="descriptionRules"
                label="Description"
                hint="No more than 200 characters"
              ></v-textarea>

              <v-checkbox
                v-model="scholarship"
                label="Scholarship Available"
                color="success"
                hide-details
              ></v-checkbox>

              <div class="form-group mt-4">
                <BaseButton name="Add Course" :loading="loading" />
              </div>
            </v-form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import NProgress from 'nprogress';
import store from '@store/index';
import { mapGetters, mapActions } from 'vuex';
import LoadingMixin from '@mixins/LoadingMixins';

export default {
  mixins: [LoadingMixin],
  computed: mapGetters(['singleBootcamp', 'getErr']),
  beforeRouteEnter(to, from, next) {
    NProgress.start();
    store.dispatch('SingleBootcamps', to.params.slug).then(res => {
      if (res && res.data.success) {
        NProgress.done();
      }
    });
    next();
  },
  data() {
    return {
      description: '',
      scholarship: false,
      minimumSkill: '',
      tuition: '',
      duration: '',
      title: '',
      valid: false,
      titleRules: [v => !!v || 'title is required'],
      items: ['beginner', 'intermediate', 'advance'],
      durationRules: [
        v => !!v || 'course duration is required',
        v => /^[0-9]*$/.test(v) || 'Only Numbers are allowed'
      ],
      tuitionRules: [
        v => !!v || 'course tuition is required',
        v => /^[0-9]*$/.test(v) || 'Only Numbers are allowed'
      ],

      descriptionRules: [
        value => !!value || 'Bootcamp Description is Required.',
        v => v.length <= 500 || 'Max 500 characters'
      ]
    };
  },
  methods: {
    ...mapActions(['createCourse']),
    handleBootcampCourse() {
      if (this.$refs.form.validate()) {
        this.toggleLoading();
        this.snackbar = true;

        const data = {
          title: this.title,
          description: this.description,
          weeks: this.duration * 1,
          tuition: this.tuition * 1,
          minimumSkill: this.minimumSkill,
          scholarshipAvailable: this.scholarship,
          bootcamp: this.$route.params.id
        };
        this.createCourse(data).then(res => {
          this.toggleLoading();
          if (res && res.data.success) {
            this.$noty.success('course created successfully');
            this.$router.push(`/bootcamp/${this.$route.params.slug}`);
          } else {
            this.$noty.error(this.getErr);
          }
        });
      }
    }
  }
};
</script>

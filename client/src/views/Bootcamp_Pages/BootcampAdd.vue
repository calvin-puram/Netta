<template>
  <section class="container mt-5">
    <h1 class="mb-2 text-secondary">Add Bootcamp</h1>
    <p>
      Important: You must be affiliated with a bootcamp to add to DevCamper
    </p>

    <v-form ref="form" v-model="valid" @submit.prevent="handleBootcampCreate">
      <div class="row">
        <div class="col-md-6">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <h3 class="text-secondary">Location & Contact</h3>
              <p class="text-muted">
                If multiple locations, use the main or largest
              </p>
              <!-- NAME -->
              <v-text-field
                v-model="name"
                label="Name"
                :rules="nameRules"
                required
              ></v-text-field>
              <!-- ADDRESS -->

              <v-text-field
                v-model="address"
                label="Full Address"
                :rules="addressRules"
                hint="Street, city, state, etc"
                required
              ></v-text-field>
              <!-- NUMBER -->
              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="Phone Number"
                required
              ></v-text-field>
              <!-- EMAIL -->
              <BaseEmail label="E-mail" model="email" />

              <!-- WEBSITE -->
              <v-text-field
                v-model="website"
                :rules="webRules"
                label="Website URL"
                required
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card bg-white py-2 px-4">
            <div class="card-body">
              <h3 class="text-secondary">Other Info</h3>
              <!-- DESCRIPTION -->
              <v-textarea
                v-model="description"
                clearable
                clear-icon="cancel"
                required
                :rules="descriptionRules"
                label="Description"
                hint="No more than 500 characters"
              ></v-textarea>
              <!-- CAREERS -->
              <v-select
                v-model="items"
                :items="items"
                attach
                chips
                label="Careers"
                multiple
              ></v-select>

              <!-- OTHERS -->
              <div class="container">
                <div class="row">
                  <div class="col-md-6 col sm-12">
                    <BaseCheckbox label="Housing" model="housing" />
                  </div>

                  <div class="col-md-6 col sm-12">
                    <BaseCheckbox
                      label="Job Assistance"
                      model="jobAssistance"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 col sm-12">
                    <BaseCheckbox label="Job Guarantee" model="jobGuarantee" />
                  </div>

                  <div class="col-md-6 col sm-12">
                    <BaseCheckbox label="Accept GI Bill" model="accepGI" />
                  </div>
                </div>
              </div>

              <p class="text-muted my-4">
                *After you add the bootcamp, you can add the specific courses
                offered
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <BaseButton name="Add Bootcamp" />
      </div>
    </v-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      name: '',
      address: '',
      description: '',
      website: '',
      phone: '',
      housing: false,
      jobAssstance: false,
      jobGuarantee: false,
      acceptGI: false,
      items: [
        'Web Development',
        'Mobile Development',
        'UI/UX',
        'Data Science',
        'Bussiness',
        'Others'
      ],
      others: ['Housing', 'Job Assistance', 'Job Guarantee', 'Accept GI Bill'],
      nameRules: [v => !!v || 'Name is required'],
      addressRules: [v => !!v || 'Address is required'],
      descriptionRules: [v => !!v || 'Bootcamp Description is required'],

      webRules: [
        v => !!v || 'Website URL is required',
        v =>
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
            v
          ) || 'please use a valid URL with HTTP or HTTPS'
      ],
      phoneRules: [
        v => !!v || 'Phone Number is required',
        v =>
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) ||
          'Phone Number must be valid'
      ]
    };
  },
  methods: {
    handleBootcampCreate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;

        const data = {
          name: this.name,
          description: this.description,
          website: this.website,
          phone: this.phone,
          email: this.email,
          address: this.address,
          careers: this.items,
          housing: this.housing,
          jobAssistance: this.jobAssistance,
          jobGuarantee: this.jobGuarantee,
          acceptGi: this.acceptGI
        };
      }
    }
  }
};
</script>

<style>
.v-input--selection-controls__input + .v-label {
  position: relative;
  top: 2.5px !important;
}
</style>

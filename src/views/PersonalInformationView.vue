<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import ProgressBar from '@/components/ProgressBar.vue';
import infoIcon from '/personalIcon.svg';
import PassportIcon from '/worldIcon.svg';
import data_country from '@/assets/dataCountry.json';
import data_months from '@/assets/dataDate.json';

const router = useRouter();

// Options
const option_month = ref([]);
const option_day = ref([]);
const option_year = ref([]);
const option_country = ref([]);
const option_nationality = ref([]);

// Dependent city options
const selected_country_cities = ref([]);

// Populate options on mount
onMounted(() => {
  option_month.value = data_months.months.map(m => ({ name: m.name, value: m.value }));
  option_day.value = data_months.days.map(d => ({ name: d.name, value: d.value }));
  option_year.value = data_months.years.map(y => ({ name: y.name, value: y.value }));

  option_country.value = data_country.map(c => ({
    country: `${c.symbol}: ${c.country}`,
    symbol: c.symbol,
    cities: c.cities
  }));

  option_nationality.value = data_country.map(c => ({
    name: c.name,
    symbol: c.symbol,
    country: c.country
  }));
});

// Validation schema
const schema = toTypedSchema(
  z.object({
    familyName: z.string()
      .trim()
      .min(1, "Family name is required")
      .max(80, "Family name must not exceed 80 characters")
      .regex(/^[A-Za-z\s]+$/, "Only letters A-Z are allowed"),

    firstName: z.string()
      .trim()
      .min(1, "First name is required")
      .max(80, "First name must not exceed 80 characters")
      .regex(/^[A-Za-z\s]+$/, "Only letters A-Z are allowed"),

    middleName: z.string()
      .trim()
      .max(80, "Middle name must not exceed 80 characters")
      .refine(val => val === "" || /^[A-Za-z\s]+$/.test(val), {
        message: "Only letters A-Z are allowed",
      })
      .optional(),

    passportNumber: z.string()
      .trim()
      .min(1, "Passport number is required")
      .max(80, "Passport number must not exceed 80 characters")
      .regex(/^[A-Za-z0-9\s]+$/, "Only letters A-Z and numbers 0-9 are allowed"),
    selected_nationality: z.string().min(1, "Nationality is required"),
    selected_country: z.string().min(1, "Country is required"),
    selected_city: z.string().min(1, "City is required"),
    selected_year: z.string().min(1, "Year is required"),
    selected_month: z.string().min(1, "Month is required"),
    selected_day: z.string().min(1, "Day is required"),
    occupation: z.string().min(1, "Occupation is required"),
    gender: z.string().min(1, "Gender is required"),
    phone_no_code: z.string().min(1, "Country code is required"),
    phone_no: z.string().min(1, "Phone number is required"),

  })
);

const onSubmit = (values) => {
  console.log("Form submitted:", values);
  router.push("/new/trip-&-accomodation-information");
};
</script>

<template>
  <header class="app-header">
    Arrival Card > Add Arrival Card
  </header>

  <div class="app-container">
    <div class="page-container">
      <div class="content-wrapper">
        <ProgressBar />

        <Form :validation-schema="schema" @submit="onSubmit">
          <!-- Passport Info -->
          <div class="form-section">
            <div class="card-header">
              <img :src="PassportIcon" alt="Passport icon">
              <h2 class="card-title">Personal Information In Passport</h2>
            </div>
            <hr class="card-divider">

            <div class="form-grid">
              <div class="form-field">
                <label>Family Name</label>
                <Field name="familyName" type="text" class="form-input" />
                <ErrorMessage name="familyName" class="error-text" />
              </div>

              <div class="form-field">
                <label>First Name</label>
                <Field name="firstName" type="text" class="form-input" />
                <ErrorMessage name="firstName" class="error-text" />
              </div>

              <div class="form-field">
                <label>Middle Name</label>
                <Field name="middleName" type="text" class="form-input" />
                <ErrorMessage name="middleName" class="error-text" />
              </div>

              <div class="form-field">
                <label>Passport No.</label>
                <Field name="passportNumber" type="text" class="form-input" />
                <ErrorMessage name="passportNumber" class="error-text" />
              </div>

              <div class="form-field">
                <label>Nationality</label>
                <Field name="selected_nationality" v-slot="{ field, meta }">
                  <PSelect :options="option_nationality" optionLabel="name" optionValue="name"
                    placeholder="Select a Nationality" :filter="true" filterBy="name" :model-value="field.value"
                    @update:model-value="field.value = $event" />
                  <span class="error-text" v-if="meta.touched && meta.error">{{ meta.error }}</span>
                </Field>
              </div>
            </div>
          </div>

          <!-- Personal Info -->
          <div class="form-section">
            <div class="card-header">
              <img :src="infoIcon" alt="Info icon">
              <h2 class="card-title">Personal Information</h2>
            </div>
            <hr class="card-divider">

            <div class="form-grid">
              <!-- Date of Birth -->
              <div class="form-field">
                <label>Date of Birth</label>
                <div class="date-inputs">
                  <Field name="selected_year" v-slot="{ field, meta }">
                    <PSelect :options="option_year" optionLabel="name" optionValue="value" placeholder="Year"
                      :model-value="field.value" @update:model-value="field.value = $event" />
                    <span class="error-text" v-if="meta.touched && meta.error">{{ meta.error }}</span>
                  </Field>

                  <Field name="selected_month" v-slot="{ field, meta }">
                    <PSelect :options="option_month" optionLabel="name" optionValue="value" placeholder="Month"
                      :model-value="field.value" @update:model-value="field.value = $event" />
                    <span class="error-text" v-if="meta.touched && meta.error">{{ meta.error }}</span>
                  </Field>

                  <Field name="selected_day" v-slot="{ field, meta }">
                    <PSelect :options="option_day" optionLabel="name" optionValue="value" placeholder="Day"
                      :model-value="field.value" @update:model-value="field.value = $event" />
                    <span class="error-text" v-if="meta.touched && meta.error">{{ meta.error }}</span>
                  </Field>
                </div>
              </div>

              <!-- Occupation -->
              <div class="form-field">
                <label>Occupation</label>
                <Field name="occupation" type="text" class="form-input" />
                <ErrorMessage name="occupation" class="error-text" />
              </div>

              <!-- Gender -->
              <div class="form-field">
                <label>Gender</label>
                <Field name="gender" v-slot="{ field, meta }">
                  <PSelect
                    :options="[{ label: 'MALE', value: 'MALE' }, { label: 'FEMALE', value: 'FEMALE' }, { label: 'UNDEFINED', value: 'UNDEFINED' }]"
                    optionLabel="label" optionValue="value" placeholder="Select Gender" :model-value="field.value"
                    @update:model-value="field.value = $event" />
                  <span class="error-text" v-if="meta.touched && meta.error">{{ meta.error }}</span>
                </Field>
              </div>

              <!-- Country -->
              <div class="form-field">
                <label>Country of Residence</label>
                <Field name="selected_country" v-slot="{ field, meta }">
                  <PSelect :options="option_country" optionLabel="country" optionValue="symbol"
                    placeholder="Select a Country" :filter="true" filterBy="country" :model-value="field.value"
                    @update:model-value="val => {
                      field.value = val;
                      selected_country_cities.value = option_country.find(c => c.symbol === val)?.cities || []
                    }" />
                  <span class="error-text" v-if="meta.touched && meta.error">{{ meta.error }}</span>
                </Field>
              </div>

              <!-- City -->
              <div class="form-field">
                <label>City of Residence</label>
                <Field name="selected_city" v-slot="{ field, meta }">
                  <PSelect :options="selected_country_cities" optionLabel="name" optionValue="name"
                    placeholder="Select a City" :filter="true" filterBy="name"
                    :disabled="!selected_country_cities.length" :model-value="field.value"
                    @update:model-value="field.value = $event" />
                  <span class="error-text" v-if="meta.touched && meta.error">{{ meta.error }}</span>
                </Field>
              </div>

              <!-- Phone -->
              <div class="form-field">
                <label>Phone</label>
                <div class="phone-inputs">
                  <Field name="phone_no_code" type="text" class="form-input phone-code" placeholder="Code" />
                  <Field name="phone_no" type="text" class="form-input" placeholder="Phone" />
                </div>
                <ErrorMessage name="phone_no_code" class="error-text" />
                <ErrorMessage name="phone_no" class="error-text" />
              </div>
            </div>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-secondary" @click="deleteClicked()">
              Delete this traveler
            </button>
            <button type="submit" class="btn btn-primary">Continue</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* Component-specific styles only if needed */
</style>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { useRouter } from 'vue-router';
import ProgressBar from '@/components/ProgressBar.vue';
import infoIcon from '/personalIcon.svg';
import PassportIcon from '/worldIcon.svg';
import data_country from '@/assets/dataCountry.json';
import data_months from '@/assets/dataDate.json';

const router = useRouter();
const count = inject('globalCount');

const option_month = ref([]);
const option_day = ref([]);
const option_year = ref([]);
const selected_year = ref('');
const selected_month = ref('');
const selected_day = ref('');

const selected_nationality = ref('');
const selected_country = ref('');
const selected_city = ref('');

const family_name = ref('');
const first_name = ref('');
const middle_name = ref('');
const passport_no = ref('');
const occupation = ref('');
const gender = ref('');
const visa_no = ref('');
const phone_no = ref('');
const phone_no_code = ref('');

const option_country = ref([]);
const option_nationality = ref([]);

onMounted(() => {
  option_month.value = data_months.months;
  option_day.value = data_months.days;
  option_year.value = data_months.years;

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
  count.value = 0;
});

watch(selected_country, () => {
  selected_city.value = '';
});

const deleteClicked = () => {
  family_name.value = '';
  first_name.value = '';
  middle_name.value = '';
  passport_no.value = '';
  occupation.value = '';
  gender.value = '';
  visa_no.value = '';
  phone_no.value = '';
  phone_no_code.value = '';
  selected_year.value = '';
  selected_month.value = '';
  selected_day.value = '';
  selected_nationality.value = '';
  selected_country.value = '';
  selected_city.value = '';
}

const onSubmit = (event) => {
  const form = event.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  if (!selected_nationality.value) {
    alert("Please select a nationality");
    return;
  }
  if (!selected_country.value) {
    alert("Please select a country");
    return;
  }
  if (!selected_city.value) {
    alert("Please select a city");
    return;
  }
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
        <div class="progress-container">
          <ProgressBar />
        </div>

        <form @submit.prevent="onSubmit">
          <!-- Passport Information Section -->
          <div class="form-section">
            <div class="card-header">
              <img :src="PassportIcon" alt="Passport icon">
              <h2 class="card-title">Personal Information In Passport</h2>
            </div>
            <hr class="card-divider">

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label form-label-required">Family Name</label>
                <input type="text" class="form-input" required v-model="family_name"
                  placeholder="Only letters A-Z are allowed. Enter '-' if none" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">First Name</label>
                <input type="text" class="form-input" required v-model="first_name"
                  placeholder="Only letters A-Z are allowed." />
              </div>

              <div class="form-field">
                <label class="form-label">Middle Name</label>
                <input type="text" class="form-input" v-model="middle_name"
                  placeholder="Only letters A-Z are allowed." />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Passport No.</label>
                <input type="text" class="form-input" required v-model="passport_no" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Nationality/Citizenship</label>
                <PSelect v-model="selected_nationality" :options="option_country" optionLabel="country"
                  placeholder="Select a Country" :filter="true" filterBy="country" />
              </div>
            </div>
          </div>

          <!-- Personal Information Section -->
          <div class="form-section">
            <div class="card-header">
              <img :src="infoIcon" alt="Info icon">
              <h2 class="card-title">Personal Information</h2>
            </div>
            <hr class="card-divider">

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label form-label-required">Date of Birth</label>
                <div class="date-inputs">
                  <select required v-model="selected_year" class="form-select">
                    <option disabled value="">yyyy</option>
                    <option v-for="option in option_year" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </select>
                  <select required v-model="selected_month" class="form-select">
                    <option disabled value="">mm</option>
                    <option v-for="option in option_month" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </select>
                  <select required v-model="selected_day" class="form-select">
                    <option disabled value="">dd</option>
                    <option v-for="option in option_day" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Occupation</label>
                <input type="text" class="form-input" required v-model="occupation" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Gender</label>
                <div class="radio-group">
                  <div class="radio-item">
                    <input type="radio" id="male" name="gender" value="MALE" required v-model="gender">
                    <label for="male">MALE</label>
                  </div>
                  <div class="radio-item">
                    <input type="radio" id="female" name="gender" value="FEMALE" required v-model="gender">
                    <label for="female">FEMALE</label>
                  </div>
                  <div class="radio-item">
                    <input type="radio" id="undefined" name="gender" value="UNDEFINED" required v-model="gender">
                    <label for="undefined">UNDEFINED</label>
                  </div>
                </div>
              </div>

              <div class="form-field">
                <label class="form-label">Visa No.</label>
                <input type="text" class="form-input" v-model="visa_no" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Country/Territory of Residence</label>
                <PSelect v-model="selected_country" :options="option_country" optionLabel="country"
                  placeholder="Select a Country" :filter="true" filterBy="country" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">City/State of Residence</label>
                <PSelect v-model="selected_city" :options="selected_country?.cities || []" placeholder="Select a City"
                  :filter="true" :disabled="!selected_country" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Phone No.</label>
                <div class="phone-inputs">
                  <span class="phone-prefix">+</span>
                  <input type="tel" class="form-input phone-code" :class="{ 'error': phoneCodeError }" required
                    v-model="phone_no_code" placeholder="Code" maxlength="4" @input="handlePhoneCodeInput"
                    @keydown="handleKeyDown">
                  <input type="tel" class="form-input" :class="{ 'error': phoneNumberError }" v-model="phone_no"
                    placeholder="Phone No." maxlength="15" required @input="handlePhoneNumberInput"
                    @keydown="handleKeyDown" />
                </div>
                <div class="error-messages">
                  <span v-if="phoneCodeError" class="error-text">{{ phoneCodeError }}</span>
                  <span v-if="phoneNumberError" class="error-text">{{ phoneNumberError }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-secondary" @click="deleteClicked()">
              Delete this traveler
            </button>
            <button type="submit" class="btn btn-primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles only if needed */
</style>

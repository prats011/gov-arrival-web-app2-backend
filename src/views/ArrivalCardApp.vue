<script setup>
import ProgressBar from '@/components/ProgressBar.vue';
import infoIcon from '@/assets/images/infoIcon.png';
import personalIcon from '@/assets/images/personalIcon.png';
import data_country from '@/assets/dataCountry.json';
import data_months from '@/assets/dataDate.json';
import SearchDropdown from '@/components/SearchDropdown.vue';
import { ref, onMounted, inject, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const count = inject('globalCount');

const option_month = ref([]);
const option_day = ref([]);
const option_year = ref([]);
const selected_year = ref('');
const selected_month = ref('');
const selected_day = ref('');

const selected_nationality = ref(null);
const selected_country = ref(null);
const selected_city = ref('');

const family_name = ref('');
const first_name = ref('');
const middle_name = ref('');
const passport_no = ref('');
const occupation = ref('');
const gender = ref('');
const visa_no = ref('');
const phone_no = ref('');

const option_country = ref([]);
const option_nationality = ref([]);

onMounted(() => {
  option_month.value = data_months.months;
  option_day.value = data_months.days;
  option_year.value = data_months.years;

  option_country.value = data_country.map(c => ({
    country: c.country,
    symbol: c.symbol,
    cities: c.cities
  }));

  option_nationality.value = data_country.map(c => ({
    name: c.name,
    symbol: c.symbol,
    country: c.country
  }));
});

watch(selected_country, () => {
  selected_city.value = '';
});

const continueClicked = () => {
  count.value++;
};

const onSubmit = (event) => {
  const form = event.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  continueClicked();
  router.push("/arrival-card/trip-&-accomodation-information");
};

//Websites used
//https://www.w3schools.com/html/html_forms.asp
//https://youtu.be/E7PzVgi2RGI?si=4Tb2yOtoL6btWXtG
//https://youtu.be/XQJegKW0ukU?si=PMuY2D_1G3o-SRCE
</script>

<template>
  <header>
    <Navbar />
    Arrival Card > Add Arrival Card
  </header>

  <div class="container">
    <ProgressBar />
    <form @submit.prevent="onSubmit">
      <div class="detail-container">

        <div class="image">
          <img :src="infoIcon">
          <h1 class="title">Personal Information In Passport</h1>
        </div>
        <hr class="line">

        <div class="details">
          <div class="detail-forms">
            <label><span class="asterick">*</span>Family Name</label>
            <input type="text" class="form-control" required v-model="family_name"
              placeholder="Only letters A-Z are allowed. Enter '-' if none" />
          </div>
          <div class="detail-forms">
            <label><span class="asterick">*</span>First Name</label>
            <input type="text" class="form-control" required v-model="first_name"
              placeholder="Only letters A-Z are allowed." />
          </div>
          <div class="detail-forms">
            <label>Middle Name</label>
            <input type="text" class="form-control" v-model="middle_name" placeholder="Only letters A-Z are allowed." />
          </div>
          <div class="detail-forms">
            <label><span class="asterick">*</span>Passport No.</label>
            <input type="text" class="form-control" required v-model="passport_no" />
          </div>

          <div class="detail-forms">
            <label><span class="asterick">*</span>Nationality/Citizenship</label>
            <SearchDropdown v-model="selected_nationality" :options="option_nationality"
              placeholder="Select your nationality" labelField="name" />
          </div>
        </div>

        <div class="image">
          <img :src="personalIcon">
          <h1 class="title">Personal Information</h1>
        </div>
        <hr class="line">

        <div class="details">
          <div class="detail-forms">
            <label><span class="asterick">*</span>Date of Birth</label>
            <div class="dob-container">
              <select v-model="selected_year" class="dob-select">
                <option disabled value="">yyyy</option>
                <option v-for="option in option_year" :key="option.value" :value="option.value">{{ option.name }}
                </option>
              </select>
              <select v-model="selected_month" class="dob-select">
                <option disabled value="">mm</option>
                <option v-for="option in option_month" :key="option.value" :value="option.value">{{ option.name }}
                </option>
              </select>
              <select v-model="selected_day" class="dob-select">
                <option disabled value="">dd</option>
                <option v-for="option in option_day" :key="option.value" :value="option.value">{{ option.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="detail-forms">
            <label><span class="asterick">*</span>Occupation</label>
            <input type="text" class="form-control" required v-model="occupation" />
          </div>

          <div class="detail-forms">
            <label><span class="asterick">*</span>Gender</label>
            <form class="radio-form">
              <input type="radio" id="male" name="gender" value="MALE" v-model="gender">
              <label for="male">MALE</label>
              <input type="radio" id="female" name="gender" value="FEMALE" v-model="gender">
              <label for="female">FEMALE</label>
              <input type="radio" id="undefined" name="gender" value="UNDEFINED" v-model="gender">
              <label for="undefined">UNDEFINED</label>
            </form>
          </div>

          <div class="detail-forms">
            <label>Visa No.</label>
            <input type="text" class="form-control" v-model="visa_no" />
          </div>

          <div class="detail-forms">
            <label>Select Country</label>
            <SearchDropdown v-model="selected_country" :options="option_country" placeholder="Select a country"
              labelField="country" />
          </div>

          <div class="detail-forms">
            <label><span class="asterick">*</span>City/State of Residence</label>
            <select v-model="selected_city" class="form-control">
              <option disabled value="">Select your city</option>
              <option v-for="city in selected_country?.cities" :key="city" :value="city">{{ city }}</option>
            </select>
          </div>

          <div class="detail-forms">
            <label><span class="asterick">*</span>Phone No.</label>
            <input type="tel" class="form-control" required v-model="phone_no" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="Format: xxx-xxx-xxxx" />
          </div>
        </div>

        <button type="submit" class="btn-continue">Continue</button>
      </div>
    </form>

    <button class="btn-delete">Delete this traveler</button>
  </div>
</template>


<style scoped>
* {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.container {
  height: calc(110vh - 60px);
  width: calc(100vw - 20px);
  margin: 10px;
  box-shadow: 0 0 10px #51575a;
}

.detail-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 70vh;
  width: 95vw;
  margin-top: -100px;
  padding: 10px;
  box-shadow: 0 0 1px #51575a;
  border-radius: 1rem;
}

.title {
  font-size: 15px;
  color: rgb(27, 108, 163);
  font-weight: 300;
  margin-top: 5px;
  padding: 0;
}

.image {
  display: flex;
  align-items: center;
}

.image img {
  width: 40px;
}

.line {
  margin: 15px 0 10px 0;
  background-color: rgb(27, 108, 163);
  border: none;
  padding: 0.1px;
}

.details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 20px 40px;
  padding: 20px;
  align-items: start;
}

.detail-forms {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
}


.detail-forms label {
  font-size: 12px;
  color: rgb(27, 108, 163);
  font-weight: 500;
  position: relative;
  white-space: wrap;
  min-width: 120px;
}

.form-control {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 12px;
  color: #374151;
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;
}

.radio-form {
  padding: 8px 20px;
  width: 100%;
  font-size: 12px;
  display: inline-flex;
}

.radio-form label {
  padding: 10px;
}

.btn-continue {
  padding: 5px 10px;
  border-radius: 20px;
  color: #ffffff;
  background-color: rgb(27, 108, 163);
  border: none;
  margin-top: -1mm;
  font-size: 12px;
  margin-left: auto;
  display: block;
}

.btn-delete {
  display: block;
  padding: 10px;
  height: fit-content;
  border-radius: 20px;
  font-size: 12px;
  border: none;
  margin-right: auto;
  margin-top: -2%;
  color: #ffffff;
  background-color: rgb(27, 108, 163);
}

.dob-container {
  display: flex;
  gap: 10px;
  width: 100%;
}

.dob-select {
  flex: 1;
  border-radius: 2rem;
  text-align: center;
  height: 5vh;
  font-size: 13px;
  color: #000000;
  background: transparent;
  outline: none;
}

.asterick {
  color: red;
}
</style>

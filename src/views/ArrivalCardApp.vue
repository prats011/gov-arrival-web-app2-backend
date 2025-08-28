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
});

watch(selected_country, () => {
  selected_city.value = '';
});

const continueClicked = () => {
  count.value++;
};


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
  <form @submit.prevent="onSubmit">
    <div class="container-tp">
      <ProgressBar />

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
            <Select v-model="selected_nationality" :options="option_nationality" optionLabel="name"
              placeholder="Select a Nationality" :filter="true" filterBy="name" />
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
            <div class="radio-form">
              <input type="radio" id="male" name="gender" value="MALE" v-model="gender">
              <label for="male">MALE</label>
              <input type="radio" id="female" name="gender" value="FEMALE" v-model="gender">
              <label for="female">FEMALE</label>
              <input type="radio" id="undefined" name="gender" value="UNDEFINED" v-model="gender">
              <label for="undefined">UNDEFINED</label>
            </div>
          </div>

          <div class="detail-forms">
            <label>Visa No.</label>
            <input type="text" class="form-control" v-model="visa_no" />
          </div>

          <div class="detail-forms">
            <label><span class="asterick">*</span>Country/Territory of Residence</label>
            <Select v-model="selected_country" :options="option_country" optionLabel="country"
              placeholder="Select a Country" :filter="true" filterBy="country" />
          </div>

          <div class="detail-forms">
            <label><span class="asterick">*</span>City/State of Residence</label>
            <Select v-model="selected_city" :options="selected_country?.cities || []" placeholder="Select a City"
              :filter="true" :disabled="!selected_country" />
          </div>

          <div class="detail-forms">
            <label><span class="asterick">*</span>Phone No.</label>
            <p style="color: rgb(27, 108, 163); font-size: 15px;">+</p>
            <input type="num" class="form-phone" required v-model="phone_no_code" placeholder="Code"
              pattern="[0-9]{2}"></input>
            <input type="tel" class="form-control" style="width: 90%;" v-model="phone_no" pattern="[0-9]{9}"
              placeholder="Phone No." />
          </div>
        </div>
      </div>
      <div class="btns">
        <button type="button" class="btn-delete" @click="deleteClicked()">Delete this traveler</button>
        <button type="submit" class="btn-continue">Continue</button>
      </div>
    </div>
  </form>
</template>


<style scoped>
* {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.container-TA {
  height: calc(150vh - 20px);
  width: calc(100vw - 20px);
  margin: 10px;
  box-shadow: 0 0 10px #51575a;
}

.detail-container-TA {
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: auto;
  width: 95vw;
  padding: 10px;
  box-shadow: 0 0 1px #51575a;
  border-radius: 1rem;
  margin-left: 20px;
}

.title {
  font-size: 15px;
  color: rgb(27, 108, 163);
  font-weight: 300;
  margin-top: 5px;
  padding: 0;
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

.text {
  font-size: 13px;
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
  min-width: 160px;
  white-space: wrap;
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

.form-control:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.form-phone {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 12px;
  color: #374151;
  background-color: #ffffff;
  max-width: 10%;

}

.radio-form {
  padding: 8px 20px;
  width: 160px;
  font-size: 12px;
  display: inline-flex;
}

.radio-form label {
  padding: 10px;
}

.btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95vw;
  gap: 10px;
  margin-left: 20px;
  flex-wrap: nowrap;
  margin-top: 10px;
}

.btn-continue {
  padding: 5px 10px;
  border-radius: 20px;
  color: #ffffff;
  background-color: rgb(27, 108, 163);
  border: none;
  font-size: 12px;
  height: 40px;
  width: 150px;
  margin: 0;
}

.btn-delete {
  padding: 10px;
  height: 40px;
  border-radius: 20px;
  font-size: 12px;
  border: none;
  color: #ffffff;
  background-color: rgb(27, 108, 163);
  width: 150px;
  margin: 0;
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

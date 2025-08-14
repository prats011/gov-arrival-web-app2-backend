<script setup>
import ProgressBar from '@/components/ProgressBar.vue';
import infoIcon from '@/assets/images/infoIcon.png';

import { ref } from 'vue';

const family_name = ref('')
const first_name = ref('')
const middle_name = ref('')
const passport_no = ref('')
const nationality = ref('')
const date_of_birth = ref('')
const occupation = ref('')
const gender = ref('')
const visa_no = ref('')
const country_residence = ref('')
const city_residence = ref('')
const phone_no = ref('')


//Websites used 
//https://www.w3schools.com/html/html_forms.asp

</script>

<template>
  <header>
    <Navbar />
    Arrival Card > Add Arrival Card
  </header>
  <div class="container">
    <ProgressBar />
    <div class="detail-container">
      <div class="info-image">
        <img :src="infoIcon">
        <h1 class="title">Personal Information In Passport</h1>
      </div>
      <hr class="line">
      <div class="details">
        <div class="detail-forms">
          <label for="validationDefault">Family Name</label>
          <input type="text" class="form-control" required v-model="family_name"
            placeholder="Only letters A-Z are allowed. Enter '-' if none" />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">First Name</label>
          <input type="text" class="form-control" required v-model="first_name"
            placeholder="Only letters A-Z are allowed." />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">Middle Name</label>
          <input type="text" class="form-control" required v-model="middle_name"
            placeholder="Only letters A-Z are allowed." />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">Passport No.</label>
          <input type="text" class="form-control" required v-model="passport_no" />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">Nationality/Citizenship</label>
          <input type="text" class="form-control" required v-model="nationality" />
        </div>
      </div>
      <h1 class="title">Personal Information</h1>
      <hr class="line">
      <div class="details">
        <div class="detail-forms">
          <label for="validationDefault">Date of Birth</label>
          <input type="text" class="form-control" required v-model="date_of_birth" />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">Occupation</label>
          <input type="text" class="form-control" required v-model="occupation" />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">Gender</label>
          <form class="radio-form">
            <input type="radio" id="male" name="gender" value="HTML">
            <label for="male">MALE</label><br>
            <input type="radio" id="female" name="gender" value="CSS">
            <label for="female">FEMALE</label><br>
            <input type="radio" id="undefined" name="gender" value="JavaScript">
            <label for="undefined">UNDEFINED</label>
          </form>
        </div>
        <div class="detail-forms">
          <label for="validationDefault">Visa No.</label>
          <input type="text" class="form-control" required v-model="visa_no" />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">Country/Territory of Residence</label>
          <input type="text" class="form-control" required v-model="country_residence" />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">City/State of Residence</label>
          <input type="text" class="form-control" required v-model="city_residence" />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">Phone No.</label>
          <input type="text" class="form-control" required v-model="phone_no" />
        </div>
      </div>
      <button class="btn-continue" @clicked="">Continue</button>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.container {
  height: calc(100vh - 60px);
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

.info-image {
  display: flex;
  align-items: center;
}

.info-image img {
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
</style>

<script setup>
import ProgressBar from '@/components/ProgressBar.vue';
import { ref } from 'vue';

const message = ref('')

</script>

<template>
  <header>
    <Navbar />
    Arrival Card > Add Arrival Card
  </header>
  <div class="container">
    <ProgressBar />
    <div class="detail-container">
      <h1 class="title">Personal Information In Passport</h1>
      <hr class="line">
      <div class="details">
        <div class="detail-forms">
          <label for="validationDefault">Family Name</label>
          <input type="text" class="form-control" required v-model="family_name" />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">First Name</label>
          <input type="text" class="form-control" required v-model="first_name" />
        </div>
        <div class="detail-forms">
          <label for="validationDefault">Middle Name</label>
          <input type="text" class="form-control" required v-model="middle_name" />
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
  display: column;
  justify-content: start;
  height: 60vh;
  width: 95vw;
  margin-top: -100px;
  padding: 10px;
  box-shadow: 0 0 1px #51575a;
  border-radius: 1rem;
}

.title {
  font-size: 15px;
  padding: 10px 0px 0 10px;
  color: rgb(27, 108, 163);
  font-weight: 300;
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
  white-space: nowrap;
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

</style>

<script setup>
//import { ref } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue';

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


</style>

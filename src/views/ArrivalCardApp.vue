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
      <h1 class="title">Personal information in Passport</h1>
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
  color: rgb(27, 108, 163);
}



</style>

<script setup>
import { ref } from 'vue'

const count = ref(0)

</script>

<template>
  <header>
      <Navbar />
      Arrival Card > Add Arrival Card
  </header>
  <div class="container">
    <div class="progress-container">
      <div class="progress-circles" :class="{ 'highlited': count >= 0 }">1</div>
      <div class="progress-text" :class="{ 'highlited': count >= 0 }">Personal Information</div>
      <div class="line" :class="{ 'highlited': count >= 1 }"></div>
      <div class="progress-circles" :class="{ 'highlited': count >= 1 }">2</div>
      <div class="progress-text" :class="{ 'highlited': count >= 1 }">Trip & Accommodation Information</div>
      <div class="line" :class="{ 'highlited': count >= 2 }"></div>
      <div class="progress-circles" :class="{ 'highlited': count >= 2 }">3</div>
      <div class="progress-text" :class="{ 'highlited': count >= 2 }">Trip & Accommodation Information</div>
    </div>
  </div>
</template>

<style scoped>

* {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.progress-container {
  display: inline-flex;
  width: inherit;
  justify-content: center;
  align-content: center;
  height: 30px;
  font-family: 'Arial', sans-serif;
}


.container {
  height: calc(100vh - 50px);
  width: calc(100vw - 20px);
  margin: 10px;
  box-shadow: 0 0 10px #51575a;
}
</style>

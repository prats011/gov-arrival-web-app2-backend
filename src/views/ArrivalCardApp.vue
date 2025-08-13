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
      <div class="progress-bar">
        <div class="progress">
          <div class="progress-circles" :class="{ 'highlited': count >= 0 }">1</div>
          <div class="progress-text" :class="{ 'highlited': count >= 0 }">Personal Information</div>
        </div>
        <div class="line" :class="{ 'highlited': count >= 1 }">
          <hr>
          </hr>
        </div>
        <div class="progress">
          <div class="progress-circles" :class="{ 'highlited': count >= 1 }">2</div>
          <div class="progress-text" :class="{ 'highlited': count >= 1 }">Trip & Accommodation Information</div>
        </div>
        <div class="line" :class="{ 'highlited': count >= 2 }">
          <hr>
          </hr>
        </div>
        <div class="progress">
          <div class="progress-circles" :class="{ 'highlited': count >= 2 }">3</div>
          <div class="progress-text" :class="{ 'highlited': count >= 2 }">Health Declaration</div>
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

/*.progress-container {
  display: inline-flex;
  width: inherit;
  justify-content: center;
  align-content: center;
  height: 30px;
  font-family: 'Arial', sans-serif;
}*/


.container {
  height: calc(100vh - 60px);
  width: calc(100vw - 20px);
  margin: 10px;
  box-shadow: 0 0 10px #51575a;
}


.progress-container {
  width: 100%;
  padding: 20px 0px;
  margin-bottom: 30px;
}


.progress-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;

}

.progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.progress-circles {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background-color: #e5e7eb;
}

.progress-text {
  text-align: center;
  max-width: 120px;
  line-height: 1.3;
  font-weight: 500;
}

.line {
  width: 100px;
  height: 2px;
  background-color: #e0e0e0;
  margin: 0 20px;
  margin-bottom: 32px;
}
</style>

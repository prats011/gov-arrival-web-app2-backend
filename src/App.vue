<script setup>
import Navbar from './components/Navbar.vue';


</script>

<template>
  <div id="App">
    <header>
      <Navbar />
    </header>
    <main>
      <div class="container">
        <div class="content">
          <h1 class="top">
            IMPORTANT NOTICE
          </h1>
          <h2 class="top">
            In accordance to Immigration Act, B.E. 2522
          </h2>
          <ol class="specifications">
            <li>All passengers must complete the Thailand Digital Arrival Card.</li>
            <li>If the alien stays in the Kingdom longer than 90 days, he/she must notify 
            in writing the nearest Immigration Officer, concerning place of stay, as soon as possible upon expiration 
            of 90 days. And required to do so every 90 days.</li>
            <li>Aliens are not allowed to work unless they are granted Work Permit.</li>
            <li>Foreigners are required to submit their arrival card information 3 days 
            in advance of their arrival date in Thailand.</li>
          </ol>
      </div>

      <div class="buttons">
        <button class="button-menu">Arrival Card<p>Provide your Thailand Digital Arrival Card details for your coming trip.</p></button>
        <button class="button-menu">Update Arrival Card</button>
      </div>
    </div>
    </main>
  </div>
</template>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  background-color: #1172a7;
  width: 100vw;
  padding: 15px;
}

.container {
  display: grid;
  margin-left: 30px;
  margin-top: 10px;
  justify-content: center;
  width: 95vw;
  height: 70vh;
  box-shadow: 0 0 5px #1172A7;
}


.top {
  display: flex;
  justify-content: center;
  color: red;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  width: 100%;
  font-weight: 100;
}

.specifications {
  color: #0056b3;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  line-height: 1.2; 
  margin-top: 10px;
  margin-left: 10vw;
  margin-right: 10vw;
}

.content {
  margin-top: 1rem;
}

.buttons {
  margin-top: -20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 200px;
}

.button-menu {
  background-color:#1172A7;
  color: #FFF;
  border: none;
  border-radius: 0.5cm;
  padding: 2vw 20vh;
  position: relative;
  text-align: center;
  
}



</style>
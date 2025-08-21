<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goHome = () => {
    router.push("/");
};
</script>


<template>
    <div class="end-container">
        <h1 class="end-message">WELL DONE YOU HAVE COMPLETED THE ARRIVAL CARD PROCESS</h1>
        <br>
        <button @click="goHome">Click here to go back to home</button>
    </div>
</template>

<style>
.end-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

button {
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    background-color: #1172a7;
    color: white;
    border-radius: 5px;
}
</style>
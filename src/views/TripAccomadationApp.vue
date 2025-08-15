<script setup>
import { inject } from 'vue';
import ProgressBar from '@/components/ProgressBar.vue';

// Inject the same global count from App.vue
const count = inject('globalCount')
console.log("The value of count: ", count.value)

// Example: increment on some action
const addOne = () => {
    count.value++
}
</script>

<template>
    <header>
        <Navbar />
    </header>
    <div class="container">
        <ProgressBar />

    </div>

</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Select here'
    },
    labelField: {
        type: String,
        default: 'country'
    }
})

const emit = defineEmits(['update:modelValue'])

const search = ref('')
const isOpen = ref(false)
const selected = ref(null)

const filteredOptions = computed(() =>
    props.options.filter(o =>
        o[props.labelField]?.toLowerCase().includes(search.value.toLowerCase())
    )
)

const selectOption = (option) => {
    selected.value = option
    emit('update:modelValue', option)
    isOpen.value = false
}
</script>

<template>
    <div class="dropdownCountry">
        <button type="button" class="dropbtn" @click="isOpen = !isOpen">
            {{ selected ? selected[props.labelField] : placeholder }}
        </button>

        <div v-if="isOpen" class="dropdown-content">
            <input type="text" v-model="search" placeholder="Search..." class="search-input" />
            <div v-for="option in filteredOptions" :key="option.symbol" class="dropdown-item"
                @click="selectOption(option)">
                {{ option[props.labelField] }}
            </div>
        </div>

    </div>
</template>

<style>
.dropdownCountry {
    position: relative;
    display: inline-block;
    width: 500px;
    color: #000;
}

.dropbtn {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    padding: 8px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    border-radius: 6px;
    font-size: 12px;
    color: #000;
}

.dropdown-content {
    position: absolute;
    background-color: #fff;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-top: 4px;
    z-index: 1000;
    color: #000;
}

.search-input {
    width: 95%;
    padding: 6px;
    margin: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #000;
}

.dropdown-item {
    padding: 8px 12px;
    cursor: pointer;
    color: #000;
}

.dropdown-item:hover {
    background-color: #f1f1f1;
}
</style>

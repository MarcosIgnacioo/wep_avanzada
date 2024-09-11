<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
const name = ref("your nameee..");
const first_num = ref(0);
const second_num = ref(0);
const sum = ref(0);

function name_typing(e: any) {
  name.value = e.target.value
}

function add() {
  sum.value = first_num.value + second_num.value;
}

</script>

<template>
  <div id="inputs">
    <label>INgresa tu nombre</label>
    <input @keyup="name_typing">
    <h1>{{ name }}</h1>
    <label>pon dos numeros no mas!!!!</label>
    <!-- @keyup="add" -->
    <!-- @keyup="add"     -->
    <input v-model.number="first_num">
    <input v-model.number="second_num">
    <button @click="add">suma</button>
    <h1>{{ sum }}</h1>
  </div>
  <button @click="count++">{{ count }}</button>
</template>

<style scoped>
#inputs {
  display: flex;
  flex-direction: column;
}
</style>

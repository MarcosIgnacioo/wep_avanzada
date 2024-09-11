<script>
import { createLanguageService } from 'typescript';
import { ref } from 'vue'

export default {
  data() {
    const count = ref(0)
    let users = ref([])
    const name = ref("")
    const rol = ref("")
    const text = ""
    console.log(users.value)
    users.value.push(1)
    return {
      name,
      rol,
      users,
      count,
      text
    }
  },

  methods: {
    sum() {
      this.count++;
    },
    add_user() {
      this.users.push({ name: this.name, rol: this.rol })
    },
    show() {
    }
  }
}
</script>

<template>
  <button v-on:click="show"></button>
  <h1>{{ count }}</h1>
  <h1>{{ text }}</h1>
  <ul>
    <li v-for="user in users">
      {{ user.name }}
      {{ user.rol }}
    </li>
  </ul>
  <button v-on:click="sum"></button>
  <form>
    <label>user name</label>
    <br>
    <input type="text" v-model="name">
    <br>
    <label>user rol</label>
    <br>
    <input type="text" v-model="rol">
    <br>
    <button type="button" v-on:click="add_user">add user</button>
  </form>
</template>

<style scoped>
#inputs {
  display: flex;
  flex-direction: column;
}
</style>

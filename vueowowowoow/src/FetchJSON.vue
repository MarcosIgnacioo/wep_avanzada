<script>
import { createLanguageService, createLanguageServiceSourceFile } from 'typescript';
import { ref } from 'vue'

export default {
  data() {
    const name = ref("foo")
    const password = ref("bar")
    return {
      name,
      password,
    }
  },

  methods: {

    add_user() {
      this.users.push({ name: this.name, password: this.password })
    },

    login() {
      fetch("users.json").then(r => {
        r.json().then(data => {
          let validSession = false;
          (data.users.forEach(u => {
            if (u.name == this.name && u.password == this.password) {
              validSession = true;
            }
          }))
          if (validSession) {
            alert("iniciaste sesion amiga que padre")
          } else {
            alert("credenciales incorrectas amiga no manches")
          }
        })
      })
    }
  }
}
</script>

<template>
  <form style="display: flex; flex-direction: column">
    <h2>login </h2>
    <label>user name</label>
    <input type="text" v-model="name">
    <label>user password</label>
    <input type="text" v-model="password">
    <button type="button" v-on:click="login">login</button>
  </form>
</template>

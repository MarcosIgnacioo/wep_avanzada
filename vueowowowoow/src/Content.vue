<script>
import { ref } from 'vue'

export default {
  data() {
    const name = ref("owo")
    const password = ref("uwu")
    const isLogged = ref(false)
    const users = ref([]);
    return {
      name,
      password,
      isLogged
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
            this.isLogged = true;
            this.users = data.users;
            alert("iniciaste sesion amiga que padre")
          } else {
            alert("credenciales incorrectas amiga no manches")
          }
        })
      })
    }
  },
}
</script>

<template>
  <div v-if="isLogged">
    <h1>wep</h1>
    <ul>
      <li v-for="user in users">
        {{ user.name }}
        {{ user.birthday }}
      </li>
    </ul>
  </div>
  <form v-else style="display: flex; flex-direction: column">
    <h2>login </h2>
    <label>user name</label>
    <input type="text" v-model="name">
    <label>user password</label>
    <input type="text" v-model="password">
    <button type="button" v-on:click="login">login</button>
  </form>
</template>

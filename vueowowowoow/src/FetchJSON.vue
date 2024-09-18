<script>
import { createLanguageService, createLanguageServiceSourceFile } from 'typescript';
import { ref } from 'vue'

export default {
  data() {
    const name = ref("owo")
    const password = ref("uwu")
    const userEditingId = ref(0);
    const text = ref("agregar usuario")
    const isLogged = ref(JSON.parse(localStorage.getItem("sessionActive")))
    let users = ref((isLogged) ? JSON.parse(localStorage.getItem("users")) : []);
    const show = ref(false);

    const newName = ref("");
    const newPassword = ref("");
    const newBirthday = ref("");
    const newAge = ref(0);
    const newAvena = ref(false);
    const callBack = ref(() => { console.log("foo") })

    return {
      users,
      name,
      password,
      isLogged,
      show,
      newName,
      newPassword,
      newBirthday,
      userEditingId,
      newAge,
      newAvena,
      callBack,
      text,
    }
  },

  methods: {

    showFormAddUser() {
      this.callBack = this.addUser
      this.text = "agregar usuario"
      this.show = true;
    },

    showFormEditUser(index) {
    },

    deleteUser(index) {
    },

    updateUser() {
    },

    logOut() {
      localStorage.clear();
      window.location.reload()
    },

    addUser() {
      const newUser = {
        "name": this.newName,
        "password": this.newPassword,
        "birthday": this.newBirthday,
        "age": this.newAge,
        "avena": this.newAvena
      }
      this.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(this.users))
    },

    login() {
      fetch("users.json").then(r => {
        r.json().then(data => {
          const validSession = data.users.some(u => u.name == this.name && u.password == this.password);
          if (validSession) {
            this.isLogged = true;
            this.users = data.users;
            localStorage.setItem("users", JSON.stringify(data.users))
            localStorage.setItem("sessionActive", "true")
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
    <button class="danger" @click="logOut">
      cerrar sesion
    </button>
    <h1>USUARIOS</h1>
    <table>
      <thead>
        <tr>
          <th>nombre</th>
          <th>contraseña</th>
          <th>dia de cumpleaños</th>
          <th>edad</th>
          <th>avena</th>
          <th>acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user, i in users" :class="{ 'white-row': i % 2 == 0 }">
          <td>
            {{ user.name }}
          </td>
          <td>
            {{ user.password }}
          </td>
          <td>
            {{ user.birthday }}
          </td>
          <td>
            {{ user.age }}
          </td>
          <td>
            {{ user.avena }}
          </td>
          <td>
            <button @click="showFormEditUser(i)">editar</button>
            <button @click="deleteUser(i)">borrar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button v-if="!show" @click="showFormAddUser">
      {{ text }}
    </button>
    <form v-else style="display: flex; flex-direction: column" @submit.prevent="callBack">
      <h2>{{ text }}</h2>
      <label>user name</label>
      <input type="text" v-model="newName">
      <label>user password</label>
      <input type="text" v-model="newPassword">
      <label>birthday</label>
      <input type="text" v-model="newBirthday">
      <label>age</label>
      <input type="text" v-model.number="newAge">
      <label>avena?</label>
      <input type="checkbox" v-model="newAvena">
      <button type="submit">
        {{ text }}
      </button>
      <button type="button" class="danger" v-on:click="show = !show">cancel</button>
    </form>
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
<style>
.white-row,
button {
  background-color: #1d1d1d;
  color: white;
}

button {
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
}

.danger {
  background-color: red;
  color: white;
  font-weight: bolder;
}

td {
  width: 10vw;
  padding: 2%;
}
</style>

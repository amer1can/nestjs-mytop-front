<template>
  <v-app>
    <v-app-bar
        :color="isAdmin ? 'red' : ''"
    >
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        <router-link to="/" class="mx-3">Главная</router-link>
      </v-app-bar-title>

      <div v-if="adminName">Привет, {{ adminName }}</div>

      <v-btn class="mx-3" @click="enterUser">{{ isAdmin ? 'Выйти' : 'Войти'  }}</v-btn>
      <v-btn v-if="!isAdmin" class="mx-3" @click="registerUser">Регистрация</v-btn>

      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'App',
  data: () => ({
  }),
  mounted() {
    if(localStorage.getItem('admin-token')) {
      this.SET_ADMIN(localStorage.getItem('admin-name'))
    }
  },
  computed: {
    ...mapState([
        'isAdmin',
        'adminName'
    ])
  },
  methods: {
    ...mapMutations([
        'SET_ADMIN'
    ]),
    enterUser() {
      if(!this.isAdmin) {
        this.$router.push('/enter')
      } else {
        this.SET_ADMIN()
        localStorage.removeItem('admin-token')
        localStorage.removeItem('admin-name')
      }
    },
    registerUser() {
      this.$router.push('/register')
    }
  },

}
</script>
<style lang="scss">
a {
  color: aquamarine;
  text-decoration: none;
  &:hover {
    color: burlywood;
  }
}
.container {
  margin: 0 auto;
  max-width: 500px;
}
</style>

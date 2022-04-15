<template>
  <div v-if="isAdmin">
    <h1 class="mb-5">Вход выполнен</h1>
    <v-btn @click="logout">Выйти</v-btn>
  </div>
  <div v-else class="container mt-5">
    <h1 class="mb-5">Вход</h1>

    <div class="auth">
          <v-text-field
              density="compact"
              variant="outlined"
              v-model="login"
              label="Логин"
              required
          />

          <v-text-field
              density="compact"
              variant="outlined"
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              hint="At least 3 characters"
              counter
              @click:append="show1 = !show1"
              label="Пароль"
              required
          />

        <v-btn
            color="success"
            @click="loginUser"
        >Войти</v-btn>

    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex";

export default {
  data: () => ({
    login: '',
    password: '',
    show1: false,
    show2: true,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 3 || 'Min 3 characters',
    },
  }),
  computed: {
    ...mapState([
        'isAdmin'
    ])
  },
  methods: {
    ...mapMutations([
        'SET_ADMIN'
    ]),
    ...mapActions([
        'LOGIN_USER'
    ]),
    loginUser() {
      this.LOGIN_USER({
        login: this.login,
        password: this.password
      })
    },
    registerUser() {
      this.$router.push('/register')
    },
    logout() {
      this.SET_ADMIN(false)
      localStorage.removeItem('admin-token')
    }
  }
}
</script>

<style>
</style>

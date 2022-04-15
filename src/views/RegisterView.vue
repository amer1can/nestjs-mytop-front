<template>
  <div class="container mt-5">
    <h1 class="mb-5">Регистрация</h1>

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
          color="info"
          @click="registerUser"
      >Зарегистрироваться</v-btn>

    </div>
  </div>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  name: "RegisterView",
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
  methods: {
    ...mapActions([
        'REGISTER_USER'
    ]),
    registerUser() {
     this.REGISTER_USER({
       login: this.login,
       password: this.password
     })
    }
  }
}
</script>

<style scoped>

</style>

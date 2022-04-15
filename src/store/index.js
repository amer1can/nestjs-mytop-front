import { createStore } from 'vuex'
import axios from "axios";
import router from '../router'
import { createToaster } from '@meforma/vue-toaster'

const toaster = createToaster()

export default createStore({
  state: {
    isAdmin: false,
    adminName: ''
  },
  getters: {
  },
  mutations: {
    SET_ADMIN(state, payload = null) {
      if(!payload) {
        state.isAdmin = false
        state.adminName = ''
      } else {
        state.isAdmin = true
        state.adminName = payload
      }
    }
  },
  actions: {
    LOGIN_USER({commit}, {login, password}) {
      axios.post('http://localhost:3000/api/auth/login', {
        login,
        password
      })
          .then(res => {
            if(res.status == 200) {
              localStorage.setItem('admin-token', res.data.access_token)
              localStorage.setItem('admin-name', login)
              commit('SET_ADMIN', login)
              toaster.show('Вход выполнен')
              router.push('/dashboard')
            }
          })
          .catch(err => {
            toaster.show('Ошибка входа')
            console.log(err)
          })
    },
    REGISTER_USER({dispatch}, {login, password}) {
      axios.post('http://localhost:3000/api/auth/register', {
        login,
        password
      })
          .then(res => {
            if(res.status == 201) {
              dispatch('LOGIN_USER', {login, password})
              toaster.show('Успешная регистрация')
            }
          })
          .catch(err => {
            console.log('Ошибка регистрации!', err)
            toaster.show('Ошибка регистрации')
          })
    }
  },
  modules: {
  }
})

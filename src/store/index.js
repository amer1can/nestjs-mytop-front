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
    //обработка ошибок
    //https://medium.com/nuances-of-programming/%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0-%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA-api-%D0%B2-%D0%B2%D0%B5%D0%B1-%D0%BF%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B8-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D1%8F-axios-932e9d66a526
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
            if(err.response.status == 401) {
              toaster.show(err.response.data.message)
              console.log(err.response)
            }
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
            if(err.response.status == 400) {
              toaster.show(err.response.data.message)
              console.log(err.response)
            }
          })
    }
  },
  modules: {
  }
})

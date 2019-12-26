import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  mutotions: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token.token);
    },
    delToken(state) {
      state.token = '';
      localStorage.removeItem("token");
    }
  }
})

export default store;

import Vue from 'vue'
import Vuex from 'vuex'
// will store whatever's in the vuex store across refreshes
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
// how Vuex works:
// You have your actions, mutations and states
// you should always invoke your actions from your Vue Components

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  plugins: [
    createPersistedState()
  ],
  // adding mutations, to invoke a mutation
  // you want to invoke an action first (that calls it)
  mutations: {
    // we're taking a state and a token
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    }
  },
  // here you do async loigc
  actions: {
    // commit or ASYNC calls
    setToken ({commit}, token) {
      // call the mutation called setToken and pass it that object
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})

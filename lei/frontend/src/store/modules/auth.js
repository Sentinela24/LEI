//store/modules/auth.js

import axios from 'axios';
const state = {
    user: null,
};
const getters = {
    isAuthenticated: state => !!state.user,
    StateUser: state => state.user,
};
const actions = {
    async LogIn({commit}, User) {
        await axios.post('http://localhost:1337/auth/local/', User)
        await commit('setUser', User.get('username'))
      },
      
};
const mutations = {
    setUser(state, username){
        state.user = username
    },
};
export default {
  state,
  getters,
  actions,
  mutations
};

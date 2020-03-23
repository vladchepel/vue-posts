import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      role: 'reader',
    },
    posts: [],
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
  mutations: {
    setUserData(state, user) {
      state.user = user;
    },
    clearUserData(state) {
      state.user = null;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    async getPosts({ commit }) {
      const { data } = await axios.get('http://localhost:3000/posts');
      commit('setPosts', data);
    },
  },
  modules: {},
});

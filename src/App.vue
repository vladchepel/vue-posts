<template>
  <div id="app">
    <b-navbar class="navbar">
      <template slot="brand">
        <b-navbar-item tag="router-link" to="/">
          <img class="navbar__logo" src="./assets/logo.svg" alt="Vue">
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <router-link v-if="isWriter" to="/create" class="button is-primary">
            Создать пост
          </router-link>
        </b-navbar-item>

        <b-navbar-item tag="div">
          <router-link v-if="!loggedIn" to="/login" class="button is-primary">Войти</router-link>
          <b-button v-else type="is-primary" @click="logout">Выйти</b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    isWriter() {
      return this.loggedIn && this.$store.state.user.role === 'writer';
    },
  },
  methods: {
    logout() {
      this.$store.commit('clearUserData');
    },
  },
};
</script>

<style lang="scss">

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding-bottom: 40px;
}

.navbar {
  background-color: transparent;
  margin-bottom: 40px;

  &__logo {
    width: 32px;
  }
}

.container {
  width: 100%;
  max-width: 500px;
}
</style>

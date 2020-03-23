<template>
  <form @submit.prevent="login" class="login">
    <b-field label="Email">
      <b-input type="email" v-model="email" required @input="clearError"/>
    </b-field>

    <b-field label="Пароль">
      <b-input type="password" v-model="password" password-reveal required @input="clearError"/>
    </b-field>

    <p v-if="error" class="help is-danger">{{ error }}</p>

    <b-button class="login__btn" type="is-primary" native-type="submit" expanded :loading="loading">
      Войти
    </b-button>
  </form>
</template>

<script>

import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false,
    };
  },
  methods: {
    async login() {
      this.clearError();
      this.loading = true;
      try {
        const { data } = await axios.get('http://localhost:3000/users');
        const foundUser = data.find((user) => user.login === this.email);
        if (foundUser && foundUser.password.toString() === this.password) {
          this.$store.commit('setUserData', foundUser);
          this.$router.push('/');
        } else {
          this.error = 'Неверный логин или пароль';
        }
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    clearError() {
      this.error = null;
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  max-width: 300px;
  margin: auto;
  padding-bottom: 100px;

  &__btn {
    margin-top: 30px;
  }
}
</style>

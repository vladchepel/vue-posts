<template>
  <div class="container">
    <div class="post box">
      <b-field label="Название">
        <b-input v-model="title" :loading="loading"/>
      </b-field>

      <b-field label="Описание">
        <b-input v-model="description" :loading="loading" type="textarea"/>
      </b-field>

      <p v-if="error" class="help is-danger">{{ error }}</p>

      <div class="post__btn-wrap">
        <b-button @click="cancel">
          Отменить
        </b-button>

        <b-button native-type="submit" type="is-primary" @click="save" :loading="loading">
          Сохранить
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CreatePost',
  data() {
    return {
      post: null,
      title: '',
      description: '',
      error: null,
      loading: false,
    };
  },
  methods: {
    async save() {
      const date = new Date();

      this.loading = true;
      this.error = null;
      try {
        await axios.post('http://localhost:3000/posts/', {
          title: this.title,
          description: this.description,
          claps: 0,
          id: date.getTime(),
          createdAt: date,
        });
        this.$router.push('/');
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
.post {

  &__btn-wrap {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>

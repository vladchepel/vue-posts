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
  name: 'EditPost',
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
      this.loading = true;
      this.error = null;
      try {
        await axios.put(`http://localhost:3000/posts/${this.$route.params.id}`, {
          ...this.post,
          title: this.title,
          description: this.description,
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
  async created() {
    this.loading = true;
    try {
      const { data } = await axios.get(`http://localhost:3000/posts/${this.$route.params.id}`);
      this.post = data;
      this.title = data.title;
      this.description = data.description;
    } catch (e) {
      this.error = e.message;
    } finally {
      this.loading = false;
    }
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

<template>
  <article class="post box">
    <h2 class="post__title">{{ post.title }}</h2>
    <div class="post__desc">{{ post.description }}</div>
    <p class="help is-danger">{{ error }}</p>
    <div class="post__footer columns">
      <time class="post__date column" :datetime="date">{{ date }}</time>
      <div v-if="isWriter" class="column is-narrow">
        <b-button icon-left="edit" @click="editPost(post.id)">Изменить</b-button>
      </div>

      <div class="column is-narrow">
        <b-button v-if="isWriter" icon-left="trash-alt" @click="confirmDelete" :loading="loading">
          Удалить
        </b-button>
      </div>

      <div v-if="isReader" class="column is-narrow">
        <b-button icon-left="sign-language" @click="clap" :loading="clapsLoading">
          {{ post.claps }}
        </b-button>
      </div>

      <b-modal></b-modal>
    </div>
  </article>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      confirm: false,
      error: null,
      loading: false,
      clapsLoading: false,
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['loggedIn']),
    date() {
      return new Date(this.post.createdAt).toLocaleDateString();
    },
    isWriter() {
      return this.loggedIn && this.user.role === 'writer';
    },
    isReader() {
      return this.loggedIn && this.user.role === 'reader';
    },
  },
  methods: {
    editPost(id) {
      this.$router.push({
        name: 'edit',
        params: { id },
      });
    },
    confirmDelete() {
      this.$buefy.dialog.confirm({
        title: 'Удаление поста',
        message: 'Вы уверенны, что хотите <strong>удалить</strong> пост?',
        onConfirm: async () => {
          this.loading = true;
          try {
            await axios.delete(`http://localhost:3000/posts/${this.post.id}`);
            await this.$store.dispatch('getPosts');
          } catch (e) {
            this.error = e.message;
          } finally {
            this.loading = false;
          }
        },
      });
    },
    async clap() {
      this.clapsLoading = true;
      try {
        await axios.put(`http://localhost:3000/posts/${this.post.id}`, {
          ...this.post,
          claps: this.post.claps + 1,
        });
        await this.$store.dispatch('getPosts');
      } catch (e) {
        this.error = e.message;
      } finally {
        this.clapsLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.post {

  &__title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__date {
    font-size: 12px;
  }

  &__desc {
    margin-bottom: 15px;
  }

  &__footer {
    align-items: flex-end;
  }
}

</style>

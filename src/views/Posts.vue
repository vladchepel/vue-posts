<template>
  <div class="posts">
    <div class="container">
      <b-notification v-if="error"
        type="is-danger"
        role="alert">
        {{ error }}
      </b-notification>

      <Post v-for="post in postsPerPage" :key="post.id" :post="post"/>

      <b-pagination
        v-if="postsLength > perPage"
        :total="postsLength"
        :current.sync="current"
        :range-before="rangeBefore"
        :range-after="rangeAfter"
        :order="order"
        :size="size"
        :simple="isSimple"
        :rounded="isRounded"
        :per-page="perPage"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">
      </b-pagination>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue';
import { mapState } from 'vuex';

export default {
  name: 'Posts',
  components: { Post },
  data() {
    return {
      page: 1,
      error: null,
      current: 1,
      perPage: 10,
      rangeBefore: 1,
      rangeAfter: 1,
      order: '',
      size: '',
      isSimple: false,
      isRounded: false,
      prevIcon: 'angle-left',
      nextIcon: 'angle-right',
    };
  },
  computed: {
    ...mapState(['posts']),
    postsLength() {
      return this.posts.length;
    },
    postsPerPage() {
      const result = [];
      const to = this.perPage * this.current;
      let i = this.postsLength > this.perPage ? (this.current - 1) * this.perPage : 1;
      for (; i < to && i < this.postsLength; i += 1) {
        result.push(this.posts[i]);
      }
      return result;
    },
  },
  async created() {
    try {
      await this.$store.dispatch('getPosts');
    } catch (e) {
      this.error = e.message;
    }
  },
};
</script>

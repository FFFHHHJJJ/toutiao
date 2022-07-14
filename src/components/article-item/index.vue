<template>
  <div class="article-item">
    <van-cell :title="article.title" :to="`/art/${article.art_id}`">
      <template #default v-if="article.cover.type === 1">
        <van-image :src="article.cover.images[0]" class="image-one"></van-image>
      </template>
      <template #label>
        <div class="image-container" v-if="article.cover.type === 3">
          <van-image
            v-for="(item, index) in article.cover.images"
            :key="index"
            :src="item"
            class="image-three"
          ></van-image>
        </div>
        <div class="label-container">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.article-item {
  .image-one {
    width: 200px;
  }
  .image-container {
    display: flex;
    justify-content: space-between;
  }
  .image-three {
    width: 200px;
    height: 200px;
  }
  .label-container {
    span {
      margin-right: 20px;
    }
  }
}
</style>

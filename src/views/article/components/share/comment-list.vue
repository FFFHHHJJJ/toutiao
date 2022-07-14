<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="出错了，点击重试"
    >
      <!-- <van-cell :title="item.content" v-for="item in list" :key="item.com_id" /> -->
      <CommentItem
        :comment="item"
        v-for="item in list"
        :key="item.com_id"
      ></CommentItem>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import CommentItem from "@/views/article/components/share/article-comment-item.vue";
import { getComments } from "@/api/comments";
export default {
  components: { CommentItem },
  name: "ArticleComment",
  props: {
    articleId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      limit: 10,
      error: false,
    };
  },

  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: "a", // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.articleId, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 每页大小
        });
        console.log(res);
        this.list.push(...res.data.data.results);
        this.loading = false;
        if (res.data.data.end_id === res.data.data.last_id) {
          this.finished = true;
        } else {
          this.offset = res.data.data.last_id;
        }
      } catch (e) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>

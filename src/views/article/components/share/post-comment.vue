<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button class="post-btn" size="small" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comments";
export default {
  name: "PostComment",
  components: {},
  props: {
    target: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      try {
        const res = await addComment({
          target: this.target, // 评论目标id（评论文章即文章id，对评论进行回复则为评论id） 防止有大数字最好也执行一下toString方法！
          content: this.message, // 评论内容
          art_id: null, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        console.log(res);
        this.$toast.success("发布文章成功");
      } catch (e) {
        console.log(e);
        this.$toast.fail("发布文章失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>

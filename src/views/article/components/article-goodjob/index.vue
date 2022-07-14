<template>
  <van-button :loading="loading" class="btn" @click="changeJob">
    <template #icon>
      <van-icon
        :color="attitude === 1 ? 'red' : ''"
        :name="attitude === 1 ? 'good-job' : 'good-job-o'"
      ></van-icon>
    </template>
  </van-button>
</template>

<script>
import { addLike, deleteLike } from "@/api/article";
export default {
  name: "ArticleJob",
  data() {
    return {
      loading: false,
    };
  },
  model: {
    prop: "attitude",
    event: "changeJob",
  },
  props: {
    attitude: [Number],
    artId: {
      type: [String, Number],
      // required: true,
    },
  },
  methods: {
    async changeJob() {
      this.loading = true;
      try {
        if (this.attitude === 1) {
          await deleteLike(this.artId);
          this.$emit("changeJob", -1);
        } else {
          await addLike(this.artId);
          this.$emit("changeJob", 1);
        }
        this.loading = false;
        this.$toast(this.attitude === 1 ? "取消点赞" : "点赞成功");
      } catch (e) {
        console.log(e);
        this.$toast("操作失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.btn {
  border: none;
}
</style>

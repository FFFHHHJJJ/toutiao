<template>
  <van-button class="btn" @click="changeCollected" :loading="loading">
    <template #icon>
      <van-icon
        :color="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
      />
    </template>
  </van-button>
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article";
export default {
  name: "CollectArticle",
  data() {
    return {
      loading: false,
    };
  },
  model: {
    prop: "isCollected",
    event: "changeCollected",
  },
  props: {
    isCollected: Boolean,
    artId: {
      type: [String, Number],
      // required: true,
    },
  },
  methods: {
    async changeCollected() {
      //   console.log(111);
      this.loading = true;
      try {
        if (this.isCollected) {
          await deleteCollect(this.artId);
        } else {
          await addCollect(this.artId);
        }
        this.loading = false;
        this.$emit("changeCollected", !this.isCollected);
        this.$toast(this.isCollected ? "取消收藏" : "收藏成功");
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

<template>
  <van-button
    v-if="!isFollowed"
    @click="follow"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="isfollowLoading"
    >关注</van-button
  >
  <van-button
    v-else
    @click="follow"
    class="follow-btn"
    round
    size="small"
    :loading="isfollowLoading"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/article";

export default {
  name: "userFollow",
  data() {
    return {
      isfollowLoading: false,
    };
  },
  model: {
    prop: "isFollowed",
    event: "changeFollow",
  },
  props: {
    // isFollow: {
    //   type: Boolean,
    //   required: true,
    // },
    autId: {
      type: [String, Number],
      required: true,
    },
    isFollowed: {
      type: Boolean,
    },
  },
  methods: {
    async follow() {
      this.isfollowLoading = true;
      try {
        if (this.isFollowed) {
          await deleteFollow(this.autId);
        } else {
          await addFollow(this.autId);
        }
        // FIXME:修改
        // this.article.is_followed = !this.article.is_followed;
        // this.isFollow = !this.isFollow;
        this.$emit("changeFollow", !this.isFollowed);
        this.$notify({
          type: "success",
          message: this.isFollowed ? "取消关注" : "关注成功",
        });
        this.isfollowLoading = false;
      } catch (e) {
        this.$notify({
          type: "danger",
          message: "操作失败",
        });
        this.isfollowLoading = false;
      }
    },
  },
};
</script>

<style></style>

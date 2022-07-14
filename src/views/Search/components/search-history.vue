<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeleteHistory">
          <van-tag class="btn" type="danger" @click="deleteAll"
            >全部删除</van-tag
          >
          <van-tag class="btn" type="success" @click="isDeleteHistory = false"
            >完成</van-tag
          >
        </template>
        <van-icon
          v-else
          name="delete"
          @click="isDeleteHistory = true"
        ></van-icon>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="clickHisyoryItem(item, index)"
    >
      <template #default v-if="isDeleteHistory">
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell>
    <!-- <van-cell title="搜索历史">
      <template #default>
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDeleteHistory: false,
    };
  },
  props: {
    searchHistories: Array,
  },
  methods: {
    clickHisyoryItem(item, index) {
      if (this.isDeleteHistory) {
        this.searchHistories.splice(index, 1);
      } else {
        this.$emit("onSearch", item);
      }
    },
    deleteAll() {
      this.$emit("delete");
    },
  },
};
</script>

<style scoped lang="less">
.btn {
  margin-right: 10px;
}
</style>

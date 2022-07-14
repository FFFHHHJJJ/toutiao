<template>
  <div>
    <van-cell
      @click="handelClick(item)"
      v-for="(item, index) in list"
      :key="index"
      icon="search"
    >
      <template> <div v-html="highLight(item)"></div> </template
    ></van-cell>
    <!-- <van-cell icon="search" title="搜索建议"></van-cell>
    <van-cell icon="search" title="搜索建议"></van-cell>
    <van-cell icon="search" title="搜索建议"></van-cell> -->
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: {
    searchText: String,
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        this.getSearchSuggestion(value);
      }, 500),
      // console.log(value);
    },
  },
  methods: {
    handelClick(item) {
      //   console.log(item);
      this.$emit("onSearch", item);
    },
    highLight(item) {
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(
        reg,
        `<span style="color:red">${this.searchText}</span>`
      );
    },
    async getSearchSuggestion(q) {
      const res = await getSearchSuggestion(q);
      this.list = res.data.data.options || [];
      //   console.log(res);
      //   this.list =res.data.data.options
      //     .map((item) => {
      //       const reg = new RegExp(this.searchText, "gi");
      //       return item.replace(
      //         reg,
      //         `<span style="color:red">${this.searchText}</span>`
      //       );
      //     }) || [];
    },
  },
};
</script>

<style></style>

<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>
    <!-- 默认搜索历史 ->> 输入内容为搜索建议 ->> 按回车搜索结果 -->
    <!-- 搜索结果 -->
    <SearchResult :searchText="searchText" v-if="isShowResult"></SearchResult>
    <!-- 搜索建议 -->
    <SearchSuggestion
      :searchText="searchText"
      v-else-if="searchText"
      @onSearch="onSearch"
    ></SearchSuggestion>
    <!-- 搜索历史 -->
    <SearchHistory
      @onSearch="onSearch"
      @delete="searchHistories = []"
      :searchHistories="searchHistories"
      v-else
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from "@/views/Search/components/search-history.vue";
import SearchSuggestion from "@/views/Search/components/search-suggestion.vue";
import SearchResult from "@/views/Search/components/search-result.vue";
import { getLocal, setLocal } from "@/utils/storage";
import { HISTORYKEY } from "@/utils/constants";
export default {
  name: "SearchPage",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false,
      searchHistories: getLocal(HISTORYKEY) || [],
    };
  },
  computed: {},
  watch: {
    searchHistories(val) {
      setLocal(HISTORYKEY, val);
    },
  },
  created() {},
  methods: {
    onSearch(value) {
      // console.log("点击了搜索");
      this.searchText = value;
      this.isShowResult = true;
      const index = this.searchHistories.indexOf(value);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(value);
    },
    onCancel() {
      // console.log("点击了取消");
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped></style>

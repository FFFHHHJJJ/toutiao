<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        :to="`/art/${item.art_id}`"
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: String,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
      error: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const res = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        });
        // console.log(res);
        this.list = [...this.list, ...res.data.data.results];
        this.loading = false;
        if (this.list.length) {
          this.page += 1;
        } else {
          this.finished = true;
        }
      } catch (e) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>

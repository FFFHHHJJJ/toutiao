<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #title>
        <van-button
          type="info"
          icon="search"
          class="search-btn"
          block
          round
          size="small"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 导航页 -->
    <van-tabs v-model="active" class="channel-tabs" swipeable animated>
      <van-tab v-for="item in userChannels" :key="item.id" :title="item.name">
        <Article-List :channels="item"></Article-List>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn">
          <TouTiaoIcon icon="gengduo"></TouTiaoIcon>
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/channels";
import ArticleList from "@/views/home/components/article-list";
export default {
  name: "HomePage",
  components: {
    ArticleList,
  },
  props: {},
  data() {
    return {
      active: 0,
      userChannels: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserChannels();
  },
  mounted() {},
  methods: {
    async getUserChannels() {
      const res = await getUserChannels();
      // console.log(res);
      this.userChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-ellipsis {
    width: 80%;
    max-width: unset;
  }
  .search-btn {
    background-color: #5babfb;
  }
  .van-icon {
    font-size: 32px;
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
  }
}
</style>

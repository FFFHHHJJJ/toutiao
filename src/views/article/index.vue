<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="$router.back()"
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 关注取消作者 -->
          <FollowUser
            :autId="article.aut_id"
            v-model="article.is_followed"
          ></FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论区域 -->
        <ComponentList :articleId="article.art_id"></ComponentList>
      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="article.comm_count" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <!-- 文章收藏 -->
      <CollectArticie
        :artId="article.art_id"
        v-model="article.is_collected"
      ></CollectArticie>
      <!-- 文章点赞 -->
      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <ArticleJob
        v-model="article.attitude"
        :artId="article.art_id"
      ></ArticleJob>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup position="bottom" v-model="isPostShow">
      <PostComment :target="article.art_id"></PostComment>
    </van-popup>
  </div>
</template>

<script>
import PostComment from "@/views/article/components/share/post-comment.vue";
import ComponentList from "@/views/article/components/share/comment-list.vue";
import ArticleJob from "@/views/article/components/article-goodjob";
import CollectArticie from "@/views/article/components/collect-article";
import FollowUser from "@/views/article/components/follow-user";
import { getArticleById } from "@/api/article";
import "github-markdown-css";
import { ImagePreview } from "vant";
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticie,
    ArticleJob,
    ComponentList,
    PostComment,
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      loading: false,
      isFound: false,
      isPostShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleById();
  },
  mounted() {},
  methods: {
    previewImage() {
      const imgs = this.$refs.content.querySelectorAll("img");
      // console.log(imgs);
      const images = [];
      imgs.forEach((item, index) => {
        images.push(item.src);
        item.addEventListener("click", () => {
          ImagePreview({
            images: images,
            startPosition: index,
          });
        });
      });
      // console.log(images);
    },
    async getArticleById() {
      this.loading = true;
      try {
        const res = await getArticleById(this.articleId);
        //   console.log(res);
        this.article = res.data.data;
        // 图片点击预览
        this.$nextTick(() => {
          this.previewImage();
        });
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
        this.isFound = e.response.status === 404;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>

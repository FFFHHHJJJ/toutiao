<template>
  <div class="channel-edit">
    <van-cell title="频道编辑" style="text-align: center"></van-cell>
    <van-cell title="我的频道">
      <template #default>
        <van-button
          class="edit-btn"
          plain
          round
          size="mini"
          type="danger"
          @click="isEdit = !isEdit"
        >
          {{ isEdit ? "完成" : "编辑" }}
        </van-button>
      </template>
    </van-cell>
    <van-grid :gutter="10" class="my-channal">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in myChannels"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道"> </van-cell>
    <van-grid :gutter="7" direction="horizontal" class="recommend-channel">
      <van-grid-item
        icon="plus"
        class="channel-item"
        v-for="value in recommendChannels"
        :key="value.id"
        @click="addchannel(value)"
      >
        <template #text>
          <span class="text">{{ value.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  frechALlChannels,
  frechAddChannel,
  deleteUserChannel,
} from "@/api/channels";
import { differenceBy } from "lodash";
import { mapState } from "vuex";
import { setLocal } from "@/utils/storage";
import { CHANNELKEY } from "@/utils/constants";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    myChannels: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      ALlChannels: [],
      isEdit: false,
    };
  },
  computed: {
    recommendChannels() {
      return differenceBy(this.ALlChannels, this.myChannels, "id");
    },
    // recommendChannels() {
    //   return this.ALlChannels.filter((item) => {
    //     return !this.myChannels.some((useritem) => useritem.id === item.id);
    //   });
    // },
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.frechALlChannels();
  },
  mounted() {},
  methods: {
    async frechALlChannels() {
      const res = await frechALlChannels();
      // console.log(res);
      this.ALlChannels = res.data.data.channels;
    },
    async addchannel(item) {
      this.myChannels.push(item);
      // 数据持久化
      if (this.user) {
        try {
          await frechAddChannel({
            id: item.id,
            seq: this.myChannels.length,
          });
          this.$toast.success("添加频道成功");
        } catch (e) {
          this.$toast.fail("添加频道失败");
        }
      } else {
        setLocal(CHANNELKEY, this.myChannels);
      }
    },
    onMyChannelClick(item, index) {
      console.log(item, index);
      if (this.isEdit) {
        //处于编辑
        if (index === 0)
          return this.$notify({ type: "danger", message: "不让删除" });
        if (index <= this.active) {
          this.$emit("onUpdateActive", this.active - 1, true);
        }
        this.myChannels.splice(index, 1);
        this.deleteUserChannel(item);
      } else {
        // 不处于编辑
        this.$emit("onUpdateActive", index, false);
      }
    },
    async deleteUserChannel(channal) {
      try {
        if (this.user) {
          await deleteUserChannel(channal.id);
        } else {
          setLocal(CHANNELKEY, this.myChannels);
        }
      } catch (e) {
        this.$toast("删除频道失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .edit-btn {
    width: 100px;
  }
  /deep/.channel-item .van-grid-item__content {
    background-color: #f4f5f6;
    height: 70px;
  }
  .text {
    font-size: 20px;
    color: #222;
    margin-top: 0;
    &.active {
      color: red;
    }
  }
  /deep/.recommend-channel {
    .van-icon-plus {
      //   color: red;
      font-size: 24px;
      margin-right: 5px;
    }
  }
  /deep/.my-channal {
    .van-icon-clear {
      position: absolute;
      top: -10px;
      right: -10px;
      color: #cacaca;
      font-size: 20px;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}
</style>

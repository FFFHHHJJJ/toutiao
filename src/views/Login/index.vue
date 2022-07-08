<template>
  <div class="login-container">
    <van-nav-bar title="登录">
      <template #left>
        <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <TouTiaoIcon icon="shouji"></TouTiaoIcon>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <TouTiaoIcon icon="yanzhengma"></TouTiaoIcon>
        </template>

        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            :time="5000"
            format="ss s"
            v-if="isShowCountDown"
          />
          <van-button
            v-else
            @click="sendSmsCode"
            class="send-sms-btn"
            size="small"
            native-type="button"
            :loading="isdisabled"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      isdisabled: false,
      isShowCountDown: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能为6位",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user);
        console.log(res);
        // 登录成功把token存到vuex和本地储存
        this.$store.commit("getToken", res.data.data);
        Toast.success("登录成功");
        this.$router.push("/my");
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data?.message || "服务器端错误");
      }
    },
    async sendSmsCode() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isdisabled = true;
        await getSmsCode(this.user.mobile);
        this.isShowCountDown = true;
        Toast.success("发送验证码成功！");
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data?.message || "报错了");
      } finally {
        this.isdisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
}
.send-sms-btn {
  width: 165px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
  border: 1px solid #07c160;
}
</style>

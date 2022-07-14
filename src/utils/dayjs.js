import dayjs from "dayjs";
// 改成中文
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
// 引入相对时间的包
import relativeTime from "dayjs/plugin/relativeTime";
import Vue from "vue";
dayjs.extend(relativeTime);

// console.log(dayjs().to(dayjs("2000-07-9")));

Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(new Date(value)));
});

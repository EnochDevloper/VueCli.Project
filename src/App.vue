<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" />
    <!-- <router-view /> -->
    <!-- <router-link to="http://www.baidu.com">[跳转到百度]</router-link>
    <router-link :to="taobao">[淘宝]</router-link>
    <router-link to="/login">[登录]</router-link>
    <router-link to="/logout">[登出]</router-link>-->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      taobao: "http://wwww.taobao.com"
    };
  },
  methods: {
    LinkWeiBo() {
      window.location.href = "http://www.weibo.com";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

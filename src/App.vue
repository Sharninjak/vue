<template>
  <div id="app">
    <!-- 路由视图容器 -->
    <div class="router-container">
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  metaInfo() { // 设置页面meta信息
    return {
      title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title, // 动态标题
      titleTemplate: title => {
        return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE; // 标题模板
      }
    };
  }
}
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

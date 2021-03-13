<template>
  <div id="app">
    <Header></Header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from "./views/Header";

export default {
  name: "App",

  components: {
    Header
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
ul {
  list-style: none;
  padding-left: 0;
}
</style>

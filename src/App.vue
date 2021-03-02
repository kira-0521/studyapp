<template>
  <div id="app">
    <Header></Header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./views/Header.vue";

export default {
  components: {
    Header,
  }
};
</script>

<style lang="scss">
@import "./assets/styles/bootstrap-reboot.css";

#app {
  margin: 0 auto;
  text-align: center;
}
.container {
  padding-top: 30px;
  &__inner {
    max-width: 1070px;
    margin: 0 auto;
    text-align: center;
  }
}
ul {
  list-style: none;
}
input,
button,
textarea,
select {
  appearance: none;
}
a {
  color: black;
  text-decoration: none;
}
.link {
  font-weight: bold;
  font-size: 20px;
}
</style>

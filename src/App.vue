<template>
  <div id="app">
    <Header></Header>
    <div class="container">
      <div class="container__inner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./views/Header";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
@import "./assets/styles/modules/_variables.scss";

#app {
  background-color: $cBg;
  height: 100vh;
  font-family: "Roboto", sans-serif;
}
.container {
  padding-top: 30px;
  &__inner {
    max-width: $contentMaxWidth;
    margin: 0 auto;
  }
}
.content {
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
.active {
  font-weight: bold;
  font-size: 20px;
}
</style>

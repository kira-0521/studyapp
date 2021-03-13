<template>
  <v-app>
    <div id="app">
      <v-main>
        <Header></Header>
        <div class="container">
          <router-view></router-view>
        </div>
      </v-main>
    </div>
  </v-app>
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
@import "./assets/styles/bootstrap-reboot.css";

.container {
  padding-top: 30px;
  &__inner {
    max-width: 1070px;
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

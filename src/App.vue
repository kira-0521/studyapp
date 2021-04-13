<template>
  <div id="app">
    <Header></Header>
    <!-- <Loading v-show="loading"></Loading> -->
    <div class="container">
      <div class="container__inner">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "./views/Header";
// import Loading from "./components/Loading";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    Header
    // Loading
  },
  computed: {
    ...mapState("getpost", ["login_user"]),
    ...mapState("loading", ["loading"])
  },
  methods: {
    ...mapActions("getpost", [
      "getStudyData",
      "setLoginUser",
      "deleteLoginUser"
    ]),
    ...mapActions("loading", ["toggle"])
  },
  created() {
    // ログイン時とログアウト時にユーザーオブジェクトが入る
    // ログインログアウトを検知する必要がある
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.toggle();
        this.setLoginUser(user);
        this.getStudyData();
        if (this.$router.currentRoute.name === "home")
          this.$router.push({ name: "input" });
        // ログアウトした際の処理
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "home" });
      }
    });
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
@import "./assets/styles/modules/_variables.scss";

html,
body,
#app,
.container {
  height: 100%;
}

#app {
  background-color: $cBg;
  font-family: "Roboto", sans-serif;
  min-height: 100%;
}
.container {
  padding-top: 30px;
  min-height: 100%;
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
  cursor: pointer;
  text-decoration: none;
}
</style>

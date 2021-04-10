<template>
  <div id="app">
    <Header></Header>
    <div class="container">
      <div class="container__inner">
        <button @click="logout">
          ログアウト
        </button>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "./views/Header";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  components: {
    Header
  },
  computed: {
    ...mapState("login", ["login_user"])
  },
  methods: {
    ...mapActions("getpost", ["getStudyData"]),
    ...mapActions("login", ["setLoginUser", "logout", "deleteLoginUser"])
  },
  created() {
    // ログイン時にログアウト時にユーザーオブジェクトが入る
    // ログインログアウトを検知する必要がある
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser();
        console.log(this.login_user);
      } else {
        this.deleteLoginUser();
        console.log(this.login_user);
      }
    });
    this.getStudyData();
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

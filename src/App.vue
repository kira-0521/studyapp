<template>
  <div id="app">
    <Loading v-show="loading"></Loading>
    <div class="container" v-show="!loading">
      <Header></Header>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "./views/Header";
import Loading from "./components/Loading";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Loading
  },
  computed: {
    ...mapState("getpost", ["login_user"]),
    ...mapState("loading", ["loading"])
  },
  async created() {
    // ログインログアウトを検知
    this.setLoading(true);
    // 初期描画の時永遠にローディングが続いてしまうため
    setTimeout(() => {
      this.setLoading(false);
    }, 2200);

    const user = await this.initFirebaseAuth();

    // 成功した時の処理
    if (user) {
      this.setLoginUser(user);
      this.getStudyData();
      if (this.$router.currentRoute.name === "home") {
        this.$router.push({ name: "input" });
      }
      // １時間たったらlogin_userをリセット
      setTimeout(() => {
        this.login_user = null;
      }, 3.6e6);
    } else {
      this.deleteLoginUser();
    }
  },
  methods: {
    ...mapActions("getpost", [
      "getStudyData",
      "setLoginUser",
      "deleteLoginUser"
    ]),
    ...mapActions("loading", ["setLoading"]),
    // ログイン時とログアウト時にユーザーオブジェクトが入る
    initFirebaseAuth() {
      return new Promise(resolve => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          // 成功したらuserを返す
          resolve(user);
          // 登録解除
          unsubscribe();
        });
      });
    }
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
  background-color: $cBg;
}
#app {
  font-family: "Roboto", sans-serif;
  min-height: 100%;
}
.container {
  padding-top: 30px;
  min-height: 100%;
  & .content {
    max-width: $contentMaxWidth;
    margin: 0 auto;
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
  cursor: pointer;
  text-decoration: none;
}
</style>

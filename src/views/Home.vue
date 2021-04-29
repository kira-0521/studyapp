<template>
  <div class="content">
    <button class="user" @click="login" v-if="login_user == null">
      Googleアカウントでログイン
    </button>
    <button class="user" @click="logout" v-if="login_user != null">
      ログアウト
    </button>
    <div class="instructions">
      <h2 class="instructions__title">アプリの使い方</h2>
      <ul class="instructions__ul">
        <li class="instructions__li">1. Googleログイン</li>
        <li class="instructions__li">2. 各項目を入力</li>
        <li class="instructions__li">3. カレンダーでデータを表示</li>
        <li class="instructions__li">4. グラフで一番集中できる場所を確認</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("getpost", ["login_user"])
  },
  methods: {
    ...mapActions("getpost", ["login", "logout"]),
    ...mapActions("loading", ["setLoading"])
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/modules/_variables.scss";
@import "../assets/styles/views/_home.scss";

.instructions {
  margin-top: 30px;
  padding: 1.6em 2.3em;
  box-shadow: inset -6px -6px 14px rgb(255 255 255 / 70%),
    inset -6px -6px 10px rgb(255 255 255 / 50%),
    inset 6px 6px 8px rgb(255 255 255 / 8%), inset 6px 6px 10px rgb(0 0 0 / 15%);
  border-radius: 32px;

  &__title {
    font-size: 1.1em;
    margin-bottom: 7px;
    color: $cTitle;
  }
  &__li {
    color: $cText;
  }
}
</style>

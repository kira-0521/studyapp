<template>
  <div class="ly_content">
    <button class="el_btn" @click="login" v-if="login_user == null">
      Googleアカウントでログイン
    </button>
    <button class="el_btn" @click="logout" v-if="login_user != null">
      ログアウト
    </button>
    <div class="bl_instructions">
      <h2 class="bl_instructions__title">アプリの使い方</h2>
      <ul class="bl_instructions__ul">
        <li class="bl_instructions__li">1. Googleログイン</li>
        <li class="bl_instructions__li">2. 各項目を入力</li>
        <li class="bl_instructions__li">3. カレンダーでデータを表示</li>
        <li class="bl_instructions__li">4. グラフで一番集中できる場所を確認</li>
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

.ly_content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10% 5%;
}
.el_btn {
  border: none;
  color: $cText;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 1em 2.8em;
  font-weight: 700;
  text-align: center;
  border-radius: 32px;
  letter-spacing: 0.2rem;
  background-color: $cBg;
  transition: 0.2s ease-in-out;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);

  &:hover {
    color: $cMain;
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.4),
      2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset -2px -2px 4px rgba(255, 255, 255, 0.5),
      inset 2px 2px 2px rgba(255, 255, 255, 0.075),
      inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
}
.bl_instructions {
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

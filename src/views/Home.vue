<template>
  <div class="ly_content">
    <base-button @parent-event="authToggle">
      {{ changeAuthMessage }}
    </base-button>
    <base-button
      @parent-event="guestLogin"
      style="margin: 30px 0;"
      v-if="!login_user"
    >
      ゲストでログイン
    </base-button>
    <div class="bl_card">
      <h2 class="bl_card__title">アプリの使い方</h2>
      <ul class="bl_card__ul">
        <li class="bl_card__li">1. Googleログイン</li>
        <li class="bl_card__li">2. 各項目を入力</li>
        <li class="bl_card__li">3. カレンダーでデータを表示</li>
        <li class="bl_card__li">4. グラフで一番集中できる場所を確認</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaseButton from "../components/BaseButton";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    BaseButton
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("getpost", ["login_user"]),
    changeAuthMessage() {
      if (this.login_user == null) {
        return "Googleログイン";
      } else {
        return "ログアウト";
      }
    }
  },
  methods: {
    ...mapActions("getpost", ["login", "logout", "guestLoginToggle"]),
    ...mapActions("loading", ["setLoading"]),
    async authToggle() {
      if (this.login_user == null) {
        await this.login();
        this.setLoading(true);
      } else {
        this.logout();
      }
    },
    async guestLogin() {
      await this.guestLoginToggle();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/modules/_variables.scss";

.ly_content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 10% 5%;
  height: 480px;

  @media screen and (max-width: 480px) {
    height: 400px;
  }
}
.bl_card {
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

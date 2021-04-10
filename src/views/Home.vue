<template>
  <div class="content">
    <button @click="login">グーグルアカウントでログイン</button>
    <router-link to="/input">入力画面へ</router-link>
    <router-link to="/graph">結果画面へ</router-link>
    <router-link to="/userdata/0">ユーザーデータ</router-link>
    <router-link to="/test">データテスト</router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("login", ["login"])
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="content">
    <button class="user" @click="login" v-if="login_user == null">
      Googleアカウントでログイン
    </button>
    <button class="user" @click="logout" v-if="login_user != null">
      ログアウト
    </button>
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
</style>

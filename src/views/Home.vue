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

.content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.user {
  margin-top: 10%;
  background-color: $cBg;
  padding: 1em 3em;
  border: none;
  border-radius: 32px;
  color: $cText;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
  text-align: center;
  outline: none;
  cursor: pointer;
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
</style>

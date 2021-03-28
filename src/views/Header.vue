<template>
  <header class="header">
    <header class="header__inner">
      <div class="header__title">
        <router-link to="/">
          <h1>studyApp</h1>
        </router-link>
      </div>
      <nav class="header__nav">
        <router-link to="/login" active-class="active" class="link login"
          >ログイン</router-link
        >
        <router-link to="/register" active-class="active" class="link register"
          >新規登録</router-link
        >
        <router-link to="/input" active-class="active" class="link input"
          >入力</router-link
        >
        <router-link
          to="/userdata/0"
          active-class="active"
          class="link userdata"
          >マイページ</router-link
        >
        <router-link to="/graph" active-class="active" class="link graph"
          >グラフ</router-link
        >
      </nav>
    </header>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/styles/modules/_variables.scss";

.header {
  box-shadow: 0 0 8px;
  &__inner {
    height: 80px;
    max-width: 1070px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }

  &__nav {
    a {
      cursor: pointer;
    }
    & .link {
      padding: 15px;
    }
  }
}
</style>

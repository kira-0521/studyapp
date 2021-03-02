<template>
  <header class="header">
    <header class="header__inner">
      <div class="header__title">
        <router-link to="/">
          <h1>studyApp</h1>
        </router-link>
      </div>
      <nav class="header__nav">
        <router-link to="/login" active-class="link" class="login"
          >ログイン</router-link
        >
        <router-link to="/register" class="register" active-class="link"
          >新規登録</router-link
        >
      </nav>
    </header>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0 0 8px;
  &__inner {
    height: 80px;
    max-width: 1070px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__nav {
    a {
      cursor: pointer;
    }
    & .login {
      padding: 30px;
    }
  }
}
</style>
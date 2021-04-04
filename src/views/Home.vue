<template>
  <div class="content">
    <router-link to="/input">入力画面へ</router-link>
    <router-link to="/graph">結果画面へ</router-link>
    <router-link to="/userdata/0">ユーザーデータ</router-link>
    <router-link to="/test">データテスト</router-link>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
}
</style>

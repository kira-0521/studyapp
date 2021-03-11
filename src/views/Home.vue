<template>
  <div class="container__inner">
    <h1>study App</h1>
    <router-link to="/input">入力画面へ</router-link>
    <router-link to="/graph">結果画面へ</router-link>
    <router-link to="/userdata">ユーザーデータ</router-link>
    <Chart></Chart>
  </div>
</template>

<script>
import Chart from "../components/Chart.vue";

export default {
  components: {
    Chart
  }
};
</script>

<style lang="scss" scoped></style>

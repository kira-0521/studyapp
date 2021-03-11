<template>
  <div class="container__inner">
    <h1>{{ $route.params.id }}</h1>
    <hr />
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("getpost", ["studyData"])
  },
  methods: {
    ...mapActions("getpost", ["getStudyData"]),
    nextUser() {
      this.$router.push();
    },
    prevUser() {
      this.$router.push();
    }
  },
  created() {
    this.getStudyData();
  }
};
</script>

<style></style>

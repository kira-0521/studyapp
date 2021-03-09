<template>
  <div class="content">
    <router-link to="/input" class="input-link" active-class="link"
      >入力画面へ</router-link
    >
    <div class="list-area">
      <ul
        v-for="(area, index) in separateArea"
        :key="index"
        class="list-area__ul"
      >
        <div
          v-for="(value, index) in area"
          :key="index"
          class="list-area__ul-inner"
        >
          <li class="list-area__li">{{ value.studyTime.stringValue }}</li>
          <li class="list-area__li">{{ value.studyArea.stringValue }}</li>
          <li class="list-area__li">{{ value.studyDensity.stringValue }}</li>
          <li class="list-area__li">{{ value.studyContent.stringValue }}</li>
          <li class="list-area__li">{{ value.nowTime.stringValue }}</li>
        </div>
      </ul>
    </div>
    <div class="areas">
      <ul class="areas__ul">
        <li v-for="area in areas" :key="area">{{ area }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("getpost", ["studyData", "areas"]),
    separateArea() {
      let sortObj = [];
      const separate = [];
      for (let i = 0; i < this.areas.length; i++) {
        this.studyData.forEach(post => {
          // index返す→0
          if (post.studyArea.stringValue.indexOf(this.areas[i]) !== -1) {
            sortObj.push(post);
          }
        });
        separate.push(sortObj);
        sortObj = [];
      }
      return separate;
    }
  },
  created() {
    this.getStudyData();
  },
  mounted() {
    this.setArea();
  },
  methods: {
    ...mapActions("getpost", ["getStudyData", "setArea", "console"])
  }
};
</script>

<style lang="scss" scoped>
.input-link {
  color: cadetblue;
}
.areas {
  &__ul {
    background-color: cadetblue;
  }
}
.list-area {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  &__ul-inner {
    margin-bottom: 30px;
  }
}
</style>

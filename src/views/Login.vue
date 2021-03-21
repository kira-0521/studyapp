<template>
  <div class="small">
    <pie-chart :chart-data="datacollection"></pie-chart>
    <button @click="console">console</button>
    <button @click="fillData">fill</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PieChart from "../chart/PieChart.js";

export default {
  components: {
    PieChart
  },
  data() {
    return {
      datacollection: null
    };
  },
  computed: {
    ...mapGetters("getpost", ["studyData", "area", "density"])
  },
  created() {
    this.getStudyData();
  },
  // この時点でデータを紐付けたいが今はできないのでとりあえずボタンで代用
  mounted() {
    this.fillData();
    // 表示されないつまり生成されてない
    console.log(this.studyData);
  },
  methods: {
    ...mapActions("getpost", ["getStudyData"]),
    fillData() {
      this.datacollection = {
        labels: this.density,
        datasets: [
          {
            data: [10, 5, 3],
            backgroundColor: ["#92b5a9", "#e8d3d1", "#f6b894"]
          }
        ]
      };
    },
    console() {
      console.log(this.studyData);
    }
  }
};
</script>

<style scoped>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>

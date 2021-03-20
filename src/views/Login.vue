<template>
  <div class="small">
    <pie-chart :chart-data="datacollection"></pie-chart>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
    ...mapState("getpost", ["studyData"]),
    area() {
      const area = this.studyData.map(value => value.studyArea.stringValue);
      return [...new Set(area)];
    },
    density() {
      const density = this.studyData.map(
        value => value.studyDensity.stringValue
      );
      return [...new Set(density)];
    }
  },
  created() {
    this.getStudyData();
  },
  mounted() {
    console.log(this.area);
    console.log(this.density);
    this.fillData();
  },
  methods: {
    ...mapActions("getpost", ["getStudyData"]),
    fillData() {
      this.datacollection = {
        labels: this.density,
        datasets: [
          {
            data: [10, 5, 3],
            backgroundColor: ["blue", "green", "purple"]
          }
        ]
      };
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

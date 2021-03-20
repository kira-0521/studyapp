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
    ...mapState("getpost", ["studyData", "areas", "density"])
  },
  created() {
    this.getStudyData();
  },
  mounted() {
    this.fillData();
    console.log(this.studyData);
  },
  methods: {
    ...mapActions("getpost", ["getStudyData"]),
    fillData() {
      this.datacollection = {
        labels: this.density,
        datasets: [
          {
            data: [10, 5, 3]
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

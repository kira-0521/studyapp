<template>
  <div class="small">
    <pie-chart :chart-data="datacollection"></pie-chart>
    <button @click="fillData()">Randomize</button>
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
    ...mapGetters("getpost", ["studyData", "areas", "density"])
  },
  created() {
    this.getStudyData();
  },
  mounted() {
    this.fillData();
  },
  methods: {
    ...mapActions("getpost", ["getStudyData"]),
    fillData() {
      this.datacollection = {
        labels: ["濃", "普", "薄"],
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

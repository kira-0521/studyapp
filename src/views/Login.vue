<template>
  <div class="small">
    <pie-chart :chart-data="datacollection"></pie-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
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
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["タリーズ"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [10, 5]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
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

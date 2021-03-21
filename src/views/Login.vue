<template>
  <div class="small">
    <pie-chart
      v-if="loaded"
      :chart-data="datacollection"
      :options="options"
      style="width: 300px; height: 300px;"
    ></pie-chart>
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
      loaded: false,
      datacollection: null,
      options: null
    };
  },
  computed: {
    ...mapGetters("getpost", ["studyData", "area", "density"]),
    // 場所ごとにデータを分割
    separateArea() {
      let sortObj = [];
      const separate = [];
      for (let i = 0; i < this.area.length; i++) {
        this.studyData.forEach(post => {
          // index返す→0
          if (post.studyArea.stringValue.indexOf(this.area[i]) !== -1) {
            sortObj.push(post);
          }
        });
        separate.push(sortObj);
        sortObj = [];
      }
      return separate;
    }
  },
  async mounted() {
    this.loaded = false;
    try {
      await this.getStudyData();
      this.fillData();
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
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

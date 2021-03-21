<template>
  <div class="small">
    <ul>
      <li>
        <h3>{{ areaName }}</h3>
        <pie-chart
          v-if="loaded"
          :chart-data="datacollection"
          :options="options"
          style="width: 300px; height: 300px;"
        ></pie-chart>
      </li>
    </ul>
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
      options: null,
      areaName: "タリーズ"
    };
  },
  computed: {
    ...mapGetters("getpost", ["studyData", "area", "density"]),
    length() {
      const array = [];

      return array;
    },
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
        labels: ["濃", "普", "薄"],
        datasets: [
          {
            label: this.area[0],
            data: [10, 5],
            backgroundColor: ["#e56758", "#f0a860", "#f0dbbe"]
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

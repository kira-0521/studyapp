<template>
  <div class="graph">
    <ul class="graph__ul">
      <li
        class="graph__li"
        v-for="(data, index) in datacollection"
        :key="index"
      >
        <h2 class="graph__title">{{ area[index] }}</h2>
        <pie-chart
          v-if="loaded"
          :chart-data="data"
          :options="options"
          style="width: 300px; height: 300px;"
        ></pie-chart>
      </li>
    </ul>
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
      loaded: false,
      datacollection: [],
      options: null
    };
  },
  computed: {
    // ...mapGetters("getpost", ["studyData", "setArea", "setDensity"]),
    // // 場所ごとにデータを分割
    // separateArea() {
    //   let sort = [];
    //   const separate = [];
    //   for (let i = 0; i < this.setArea.length; i++) {
    //     // areaのi番目とdataのstudyAreaが一致したらsortにpush
    //     this.studyData.forEach(data => {
    //       if (data.studyArea.stringValue.includes(this.setArea[i])) {
    //         sort.push(data);
    //       }
    //     });
    //     separate.push(sort);
    //     sort = [];
    //   }
    //   return separate;
    // },
    // // 場所ごとに分けたデータから集中度ごとに数値を計算
    // separateDensity() {
    //   const separate = [];
    //   for (let i = 0; i < this.separateArea.length; i++) {
    //     const densitySum = {
    //       deep: 0,
    //       normal: 0,
    //       light: 0
    //     };
    //     this.separateArea[i].forEach(data => {
    //       const stDensity = data.studyDensity.stringValue;
    //       const stTime = Number(data.studyTime.integerValue);
    //       if (stDensity == "真") {
    //         if (densitySum.deep === 0) {
    //           densitySum.deep = stTime;
    //         } else {
    //           densitySum.deep += stTime;
    //         }
    //       } else if (stDensity == "中") {
    //         if (densitySum.normal === 0) {
    //           densitySum.normal = stTime;
    //         } else {
    //           densitySum.normal += stTime;
    //         }
    //       } else {
    //         if (densitySum.light === 0) {
    //           densitySum.light = stTime;
    //         } else {
    //           densitySum.light += stTime;
    //         }
    //       }
    //     });
    //     separate.push(densitySum);
    //   }
    //   return separate;
    // }
  },
  async mounted() {
    this.loaded = false;
    try {
      await this.fillData();
      this.loaded = true;
      // データを受け取ってから描画
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    fillData() {
      for (let i = 0; i < this.setArea.length; i++) {
        const graphData = {
          labels: ["真", "中", "浅"],
          datasets: [
            {
              data: [
                this.separateDensity[i].deep,
                this.separateDensity[i].normal,
                this.separateDensity[i].light
              ],
              backgroundColor: ["#2a83a2", "#59b9c6", "#abced8"],
              hoverBorderWidth: 3
            }
          ]
        };
        this.datacollection.push(graphData);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.graph {
  &__ul {
    display: flex;
    flex-direction: row;
  }
}
</style>

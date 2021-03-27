<template>
  <div class="small">
    <div v-for="(data, index) in datacollection" :key="index">
      <pie-chart
        v-if="loaded"
        :chart-data="data"
        :options="options"
        style="width: 300px; height: 300px;"
      ></pie-chart>
    </div>
    <button @click="console">console</button>
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
      datacollection: [],
      options: null
    };
  },
  computed: {
    ...mapGetters("getpost", ["studyData", "area", "density"]),
    // 場所ごとにデータを分割
    // separateArea() {
    //   let sortObj = [];
    //   const separate = [];
    //   for (let i = 0; i < this.area.length; i++) {
    //     this.studyData.forEach(post => {
    //       // index返す→0
    //       if (post.studyArea.stringValue.indexOf(this.area[i]) !== -1) {
    //         sortObj.push(post);
    //       }
    //     });
    //     separate.push(sortObj);
    //     sortObj = [];
    //   }
    //   return separate;
    // },
    // 場所ごとにデータを分割
    separateArea() {
      let sort = [];
      const separate = [];
      for (let i = 0; i < this.area.length; i++) {
        // areaのi番目とdataのstudyAreaが一致したらsortにpush
        this.studyData.forEach(data => {
          if (data.studyArea.stringValue.includes(this.area[i])) {
            sort.push(data);
          }
        });
        separate.push(sort);
        sort = [];
      }
      return separate;
    },
    // 場所ごとに分けたデータから集中度ごとに数値を計算
    separateDensity() {
      const separate = [];
      for (let i = 0; i < this.separateArea.length; i++) {
        const densitySum = {
          deep: 0,
          normal: 0,
          light: 0
        };
        this.separateArea[i].forEach(data => {
          const stDensity = data.studyDensity.stringValue;
          const stTime = Number(data.studyTime.integerValue);
          if (stDensity == "濃") {
            if (densitySum.deep === 0) {
              densitySum.deep = stTime;
            } else {
              densitySum.deep += stTime;
            }
            // let deepArray = [];
            // deepArray.push(stTime);
            // densitySum.deep = deepArray.reduce((acc, value) => acc + value);
          } else if (stDensity == "普") {
            if (densitySum.normal === 0) {
              densitySum.normal = stTime;
            } else {
              densitySum.normal += stTime;
            }
            // let normalArray = [];
            // normalArray.push(stTime);
            // densitySum.normal = normalArray.reduce((acc, value) => acc + value);
          } else {
            if (densitySum.light === 0) {
              densitySum.light = stTime;
            } else {
              densitySum.light += stTime;
            }
            // let lightArray = [];
            // lightArray.push(stTime);
            // densitySum.light = lightArray.reduce((acc, value) => acc + value);
          }
        });
        separate.push(densitySum);
      }
      return separate;
    }
  },
  async mounted() {
    this.loaded = false;
    try {
      await this.getStudyData();
      this.fillData();
      // データを受け取ってから描画
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    ...mapActions("getpost", ["getStudyData"]),
    fillData() {
      for (let i = 0; i < this.area.length; i++) {
        const graphData = {
          labels: ["濃", "普", "薄"],
          datasets: [
            {
              label: this.area[i],
              data: [
                this.separateDensity[i].deep,
                this.separateDensity[i].normal,
                this.separateDensity[i].light
              ],
              backgroundColor: ["#e56758", "#f0a860", "#f0dbbe"]
            }
          ]
        };
        this.datacollection.push(graphData);
      }
    },
    console() {
      console.log(this.separateArea);
      console.log(this.separateDensity);
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

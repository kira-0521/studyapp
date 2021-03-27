<template>
  <div class="small">
    <ul v-for="name in areaName" :key="name">
      <li>
        <h3>{{ name }}</h3>
        <pie-chart
          v-if="loaded"
          :chart-data="datacollection"
          :options="options"
          style="width: 300px; height: 300px;"
        ></pie-chart>
      </li>
    </ul>
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
      datacollection: null,
      options: null,
      areaName: ["タリーズ"]
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
          const stTime = data.studyTime.integerValue;
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
      this.loaded = true;
      console.log(this.studyData);
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
    },
    console() {
      console.log(this.separateArea);
      console.log(this.separateDensity);
      console.log(this.area);
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

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
      const separateDensity = [];
      for (let i = 0; i < this.separateArea.length; i++) {
        let densitySum = {
          deep: 0,
          normal: 0,
          light: 0
        };
        this.separateArea[i].forEach(data => {
          const stDensity = data.studyDensity.stringValue;
          const stTime = data.studyTime.integerValue;
          if (stDensity === "濃") {
            let array = [];
            array.push(stTime);
            densitySum.deep = array.reduce((acc, value) => acc + value);
            array = [];
          } else if (stDensity === "普") {
            let array = [];
            array.push(stTime);
            densitySum.normal = array.reduce((acc, value) => acc + value);
            array = [];
          } else {
            let array = [];
            array.push(stTime);
            densitySum.light = array.reduce((acc, value) => acc + value);
            array = [];
          }
        });
        separateDensity.push(densitySum);
      }
      return separateDensity;
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

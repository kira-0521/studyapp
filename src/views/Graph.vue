<template>
  <ul class="graph__ul">
    <li class="graph__li" v-for="(data, index) in datacollection" :key="index">
      <div class="graph__inner">
        <h3 class="graph__title">{{ setArea[index] }}</h3>
        <p class="graph__sum">
          合計:
          {{
            separateDensity[index].deep +
              separateDensity[index].normal +
              separateDensity[index].light
          }}時間
        </p>
        <pie-chart
          v-if="loaded"
          :chart-data="data"
          :options="options"
          style="width: 200px; height: 200px; display: inline-block;"
        ></pie-chart>
      </div>
    </li>
  </ul>
</template>

<script>
import PieChart from "../chart/PieChart.js";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    PieChart
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
  data() {
    return {
      loaded: false,
      datacollection: [],
      options: null
    };
  },
  computed: {
    ...mapState("getpost", ["studyData", "login_user"]),
    ...mapGetters("getpost", ["setArea", "setDensity"]),
    // 場所ごとにデータを分割
    separateArea() {
      let sort = [];
      const separate = [];
      for (let i = 0; i < this.setArea.length; i++) {
        // areaのi番目とdataのstudyAreaが一致したらsortにpush
        this.studyData.forEach(data => {
          if (data.studyArea.includes(this.setArea[i])) {
            sort.push(data);
          }
        });
        separate.push(sort);
        sort = [];
      }
      return separate;
    },
    // 場所ごとに分けたデータから集中度ごとの合計値を計算
    separateDensity() {
      const separate = [];
      for (let i = 0; i < this.separateArea.length; i++) {
        const densitySum = {
          deep: 0,
          normal: 0,
          light: 0
        };
        this.separateArea[i].forEach(data => {
          const stDensity = data.studyDensity;
          const stTime = Number(data.studyTime);
          if (stDensity == "真") {
            if (densitySum.deep === 0) {
              densitySum.deep = stTime;
            } else {
              densitySum.deep += stTime;
            }
          } else if (stDensity == "中") {
            if (densitySum.normal === 0) {
              densitySum.normal = stTime;
            } else {
              densitySum.normal += stTime;
            }
          } else {
            if (densitySum.light === 0) {
              densitySum.light = stTime;
            } else {
              densitySum.light += stTime;
            }
          }
        });
        separate.push(densitySum);
      }
      return separate;
    }
  },
  methods: {
    fillData() {
      for (let i = 0; i < this.setArea.length; i++) {
        const chartData = {
          labels: ["真", "中", "浅"],
          datasets: [
            {
              data: [
                this.separateDensity[i].deep,
                this.separateDensity[i].normal,
                this.separateDensity[i].light
              ],
              backgroundColor: ["#2b80d5", "#72aae2", "#ffffff"],
              borderColor: "transparent",
              hoverBorderWidth: 3
            }
          ]
        };
        this.datacollection.push(chartData);
      }
      const option = {
        responsive: true,
        legend: {
          position: "right"
        },
        tooltips: {}
      };
      this.options = option;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/modules/_variables.scss";
.graph {
  &__ul {
    display: grid;
    grid-template-columns: 1fr;

    @media screen and(min-width: 480px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &__li {
    text-align: center;
    padding: 5%;
  }
  &__inner {
    border-radius: 23px;
    box-shadow: 11px 11px 22px #d7d7d7, -2px -11px 22px #ffffff;
    padding: 5% 0 0;
    position: relative;
  }
  &__title {
    text-shadow: 1px 1px 1px $cWhite;
    color: $cText;
  }
  &__sum {
    position: absolute;
    right: 41px;
    top: 66px;
    color: $cSecond;
    font-size: 14px;
  }
}
</style>

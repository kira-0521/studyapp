import { Doughnut, mixins } from "vue-chartjs";
// 値をリアクティブにするため
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    this.renderChart(this.chartData, this.options);
  }
};

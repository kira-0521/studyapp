<script>
import { Bar } from "vue-chartjs";
import { mapGetters } from "vuex";

export default {
  extends: Bar,
  name: "chart",
  computed: {
    ...mapGetters("getpost", ["studyData", "areas"])
  },
  data() {
    return {
      data: {
        labels: this.areas,
        datasets: [
          {
            label: "Bar Dataset",
            data: [100, 200, 300, 440, 550, 350],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 5
          },
          {
            label: "Line Dataset",
            data: [100, 200, 30, 440, 550, 350],
            borderColor: "#CFD8DC",
            // ボーダー下
            fill: false,
            type: "line",
            lineTension: 0.3
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                // x軸タイトル
                display: true,
                labelString: "Month",
                fontColor: "red"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1000,
                min: 0
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>

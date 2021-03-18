<script>
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: ["chartdata", "options"],
  mounted() {
    this.rendarChart(data, options);
  }
};
</script>

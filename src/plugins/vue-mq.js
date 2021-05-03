import Vue from "vue";
import VueMq from "vue-mq";

export default Vue.use(VueMq, {
  breakpoints: {
    mobile: 599,
    pc: 600
  }
});

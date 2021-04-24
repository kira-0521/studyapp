import Vue from "vue";
import VueMq from "vue-mq";

export default Vue.use(VueMq, {
  breakpoints: {
    mobile: 479,
    pc: 480,
    lg: Infinity
  },
  defaultBreakpoint: "mobile"
});

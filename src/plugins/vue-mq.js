import Vue from "vue";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakPoints: {
    sm: 479,
    md: 480
  },
  defaultBreakpoint: "sp"
});

export default {
  VueMq
};

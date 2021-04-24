import Vue from "vue";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakPoints: {
    sp: 479,
    pc: 480
  },
  defaultBreakpoint: "sp"
});

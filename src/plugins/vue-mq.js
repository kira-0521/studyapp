import Vue from "vue";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakPoints: {
    sp: 375,
    px: 376
  },
  defaultBreakpoint: "sp"
});

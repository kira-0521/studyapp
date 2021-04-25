<template>
  <v-app>
    <v-main style="backgroundColor: #efefef;">
      <div class="content__inner">
        <Calendar @calendarClick="changeDate" />
        <div class="user-data" v-if="view">
          <div class="user-data__inner">
            <div class="flex log-title">
              <pen-tool-icon size="1.5x" color="#516C9D"></pen-tool-icon>
              <h2 class="user-data__log">記 録</h2>
            </div>
            <div class="flex">
              <calendar-icon
                size="1.2x"
                color="#008047"
                class="custom-class calendar"
              ></calendar-icon>
              <p class="user-data__date nowtime">
                {{ studyData[id].nowTime }}
              </p>
            </div>
            <ul class="user-data__ul">
              <li class="user-data__li">
                <clock-icon size="0.9x" class="custom-class"></clock-icon>
                <span class="contents">時間 </span>
                <span class="userdata__data time"
                  >{{ studyData[id].studyTime }}時間</span
                >
              </li>
              <li class="user-data__li">
                <map-pin-icon size="0.9x" class="custom-class"></map-pin-icon>
                <span class="contents">場所 </span>
                <span class="userdata__data area"></span
                >{{ studyData[id].studyArea }}
              </li>
              <li class="user-data__li">
                <bar-chart-icon
                  size="0.9x"
                  class="custom-class"
                ></bar-chart-icon>

                <span class="contents">集中力 </span>
                <span class="userdata__data density">{{
                  studyData[id].studyDensity
                }}</span>
              </li>
              <li class="user-data__li" style="display: inline-block;">
                <book-open-icon
                  size="0.9x"
                  class="custom-class"
                ></book-open-icon>
                <span class="contents">内容</span>
                <span class="userdata__data other-content">{{
                  studyData[id].studyContent
                }}</span>
              </li>
            </ul>
            <!-- <div class="user-data__link"> -->
            <!-- 動的ルーティング -->
            <!-- <router-link :to="'/userdata/' + (Number(id) + 1)" -->
            <!-- >Prev</router-link -->
            <!-- > -->
            <!-- <router-link :to="'/userdata/' + (Number(id) - 1)" -->
            <!-- >Next</router-link -->
            <!-- > -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
// import dayjs from "dayjs";
import Calendar from "../components/Calendar";
import { mapState } from "vuex";
import {
  PenToolIcon,
  CalendarIcon,
  ClockIcon,
  BarChartIcon,
  BookOpenIcon,
  MapPinIcon
} from "vue-feather-icons";

export default {
  // ルーティングに必要なid
  props: ["id"],
  components: {
    Calendar,
    PenToolIcon,
    CalendarIcon,
    ClockIcon,
    BarChartIcon,
    BookOpenIcon,
    MapPinIcon
  },
  data() {
    return {
      view: true
    };
  },
  // mounted() {
  //   for (const [data, index] of this.studyData) {
  //     const today = dayjs().format("YYYY-MM-DD");
  //     const getDate = data.nowTime;
  //     if (today === getDate) {
  //       this.id = index;
  //       this.view = true;
  //       break;
  //     } else {
  //       return;
  //     }
  //   }
  // },
  computed: {
    ...mapState("getpost", ["studyData"])
  },
  methods: {
    // 日付取得 → 日付一致すれば表示,処理終了. 一致しなければview=false.
    changeDate(calendarDate) {
      for (let data of this.studyData) {
        if (data.nowTime == calendarDate) {
          const index = [].slice.call(this.studyData).indexOf(data);
          console.log(`date: ${calendarDate} / index: ${index}`);
          this.$router.push({ name: "userdata", params: { id: index } });
          this.view = true;
          break;
        } else {
          this.view = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/modules/_variables.scss";
@import "../assets/styles/modules/_user-data.scss";
</style>

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
.content__inner {
  display: grid;
  padding: 0 1%;
  background-color: $cBg;
}

.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.user-data {
  margin: 5% auto;
  min-width: 360px;

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  &__log {
    letter-spacing: 3px;
    text-shadow: 1px 1px 1px $cWhite;
    color: $cTitle;
    font-size: 30px;
  }

  &__date {
    font-size: 20px;
    margin-top: 20px;
    font-weight: bold;
    color: $cText;
  }

  &__ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    padding-left: 0;
  }

  &__li {
    font-size: 18px;
    margin: 5% 0;
    width: 100%;
    @extend .flex;
    justify-content: flex-start;

    &:last-child {
      margin: 5% 0 0 0;
    }
  }

  &__link {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 30px;
    padding: 0 5%;

    & > a {
      font-weight: bold;
      color: $cText;
    }
  }

  .custom-class:not(.calendar) {
    color: $cSecond;
  }
  .calendar {
    margin-right: 8px;
  }

  span.contents {
    font-size: 12px;
    padding: 2%;
    color: $cTextReverse;
  }
}

@media screen and (min-width: 960px) {
  .content__inner {
    grid-template-columns: 2fr 1fr;
  }
  .user-data {
    margin-top: 0;
  }
}
</style>

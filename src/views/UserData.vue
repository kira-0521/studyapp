<template>
  <v-app>
    <v-main>
      <div class="container__inner">
        <Calendar @calendarClick="viewDate" />
        <div class="user-data" v-if="view">
          <div class="user-data__inner">
            <div class="flex">
              <pen-tool-icon size="1.5x" color="#ff7a00"></pen-tool-icon>
              <h2 class="user-data__log">記録</h2>
            </div>
            <div class="flex">
              <calendar-icon
                size="1.2x"
                color="#fc5185"
                class="custom-class calendar"
              ></calendar-icon>
              <p class="user-data__date">
                {{ studyData[id].nowTime }}
              </p>
            </div>
            <ul class="user-data__ul">
              <li class="user-data__li">
                <clock-icon size="0.9x" class="custom-class"></clock-icon>
                <span class="content">時間: </span
                >{{ studyData[id].studyTime }}時間
              </li>
              <li class="user-data__li">
                <map-pin-icon size="0.9x" class="custom-class"></map-pin-icon>
                <span class="content">場所: </span>{{ studyData[id].studyArea }}
              </li>
              <li class="user-data__li">
                <bar-chart-icon
                  size="0.9x"
                  class="custom-class"
                ></bar-chart-icon>

                <span class="content">集中度: </span
                >{{ studyData[id].studyDensity }}
              </li>
              <li class="user-data__li" style="display: inline-block;">
                <book-open-icon
                  size="0.9x"
                  class="custom-class"
                ></book-open-icon>
                <span class="content">内容: </span
                >{{ studyData[id].studyContent }}
              </li>
            </ul>
            <div class="user-data__link">
              <!-- 動的ルーティング -->
              <router-link :to="'/userdata/' + (Number(id) - 1)"
                >Prev</router-link
              >
              <router-link :to="'/userdata/' + (Number(id) + 1)"
                >Next</router-link
              >
            </div>
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
      view: false
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
    viewDate(calendarDate) {
      for (let data of this.studyData) {
        if (data.nowTime === calendarDate) {
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

.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
ul {
  padding-left: 0;
}
p,
li,
a {
  color: $cText;
}
.container__inner {
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 0 3%;
}
.user-data {
  box-shadow: -5px -5px 20px 0 $cWhite, 5px 5px 20px 0 $cShadow;
  border-radius: 10%;
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  &__log {
    letter-spacing: 3px;
    text-shadow: 1px 1px 1px $cWhite;
    color: $cOrange;
    font-size: 30px;
  }

  &__date {
    font-size: 20px;
    margin-top: 20px;
    font-weight: bold;
  }

  &__ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
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
    }
  }

  .custom-class:not(.calendar) {
    color: $cBlue;
  }
  .calendar {
    margin-right: 8px;
  }

  span.content {
    font-size: 12px;
    padding: 2%;
    color: $cSecondText;
  }
}

@media screen and (min-width: 960px) {
  .container__inner {
    grid-template-columns: 2fr 1fr;
  }
}
</style>

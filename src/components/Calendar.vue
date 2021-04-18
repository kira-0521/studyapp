<template>
  <div class="wrapper">
    <v-sheet
      title
      height="4vh"
      min-width="375px"
      max-width="600px"
      color="indigo"
      class="d-flex align-center"
      :elevation="elevation"
    >
      <v-btn
        rounded
        elevation="6"
        height="24"
        color="white"
        small
        class="ma-4"
        @click="setToday"
        >今日</v-btn
      >
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet
      height="56vh"
      min-width="375px"
      max-width="600px"
      :elevation="elevation"
    >
      <v-calendar
        :month-format="
          timestamp => new Date(timestamp.date).getMonth() + 1 + ' /'
        "
        ref="calendar"
        v-model="value"
        locale="ja-jp"
        :events="events"
        :event-color="getEventColor"
        :day-format="timestamp => new Date(timestamp.date).getDate()"
        @change="getEvents"
        @click:event="showEvent"
        @click:date="changeDay"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";

export default {
  data() {
    return {
      events: [],
      value: dayjs().format("YYYY-MM-DD"), // 現在日時
      elevation: 10
    };
  },
  computed: {
    ...mapState("getpost", ["studyData"]),
    title() {
      return dayjs(this.value).format("YYYY年 M月");
    }
  },
  methods: {
    setToday() {
      this.value = dayjs().format("YYYY-MM-DD");
    },
    showEvent({ event }) {
      alert(`${event.name}`);
    },
    // データと日付が一致する場合ユーザーデータを表示
    changeDay({ date }) {
      this.$emit("calendarClick", date);
    },
    getEvents() {
      const events = [];
      this.studyData.forEach(date => {
        const nowTime = date.nowTime;
        const content = date.studyContent;
        const obj = {
          name: content,
          start: dayjs(nowTime).toDate(), // 開始時刻
          end: dayjs(nowTime).toDate(), // 終了時刻
          color: "green",
          timed: false // 終日ならfalse
        };
        events.push(obj);
      });
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    }
    // eventMore() {
    //   this.$vuetify.calendar.moreEvents;
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/modules/_variables.scss";

// .wrapper {
//   box-shadow: -5px -5px 20px 0 $cWhite, 5px 5px 20px 0 $cShadow;
//   border-radius: 10%;
//   padding: 5% 10% 5% 3%;
//   margin: 0 3%;
// }
</style>

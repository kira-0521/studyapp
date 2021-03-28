<template>
  <div>
    <v-sheet
      title
      height="4vh"
      width="600px"
      color="grey lighten-3"
      class="d-flex align-center"
    >
      <v-btn outlinned small class="ma-4" @click="setToday">今日</v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="56vh" width="600px">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :event-color="getEventColor"
        locale="ja-jp"
        :day-format="timestamp => new Date(timestamp.date).getDate()"
        :month-format="
          timestamp => new Date(timestamp.date).getMonth() + 1 + ' /'
        "
        @change="getEvents"
        @click:event="showEvent"
        @click:date="viewDay"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
  data() {
    return {
      events: [],
      value: moment().format("yyyy-MM-DD") // 現在日時
    };
  },
  computed: {
    ...mapState("getpost", ["studyData"]),
    title() {
      return moment(this.value).format("yyyy年 M月");
    }
  },
  methods: {
    setToday() {
      this.value = moment().format("yyyy-MM-DD");
    },
    showEvent({ event }) {
      alert(`${event.name}`);
    },
    // データと日付が一致する場合ユーザーデータを表示
    viewDay({ date }) {
      this.$emit("calendarClick", date);
    },
    getEvents() {
      const events = [
        {
          name: "会議",
          start: moment("2021-03-03 1:00:00").toDate(), // 開始時刻
          end: moment("2021-03-03 2:00:00").toDate(), // 終了時刻
          color: "blue",
          timed: true // 終日ならfalse
        },
        {
          name: "勉強会",
          start: moment("2021-03-05 1:00:00").toDate(), // 開始時刻
          end: moment("2021-03-05 2:00:00").toDate(), // 終了時刻
          color: "green",
          timed: false // 終日ならfalse
        },
        {
          name: "休暇",
          start: moment("2021-03-06 15:00:00").toDate(),
          end: moment("2021-03-06 17:00:00").toDate(),
          color: "orange",
          timed: true
        }
      ];
      this.events = events;
    },
    getEventColor(event) {
      return event.color;
    }
  }
};
</script>

<style></style>

<template>
  <div class="calendar">
    <v-sheet
      title
      height="4vh"
      width="600px"
      color="lighten-3"
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
        :month-format="
          timestamp => new Date(timestamp.date).getMonth() + 1 + ' /'
        "
        ref="calendar"
        v-model="value"
        :events="events"
        :event-color="getEventColor"
        locale="ja-jp"
        :day-format="timestamp => new Date(timestamp.date).getDate()"
        @change="getEvents"
        @click:event="showEvent"
        @click:date="viewDay"
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
      value: dayjs().format("YYYY-MM-DD") // 現在日時
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
    viewDay({ date }) {
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
  }
};
</script>

<style lang="scss" scoped></style>

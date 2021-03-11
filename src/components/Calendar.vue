<template>
  <div>
    <v-sheet
      title
      height="6vh"
      color="grey lighten-3"
      class="d-flex align-center"
    >
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="94vh">
      <v-calendar
        ref="calendar"
        :events="events"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
      value: this.$moment().format("yyyy-MM-DD") // 現在日時
    };
  },
  computed: {
    title() {
      return this.$moment(this.value).format("yyyy年 M月");
    }
  },
  methods: {
    getEvents() {
      const events = [
        {
          name: "会議",
          start: new Date("2021-03-03T01:00:00"), // 開始時刻
          end: new Date("2021-03-03T02:00:00"), // 終了時刻
          color: "blue",
          timed: true // 終日ならfalse
        },
        {
          name: "勉強会",
          start: new Date("2021-03-05T01:00:00"), // 開始時刻
          end: new Date("2021-03-05T02:00:00"), // 終了時刻
          color: "green",
          timed: false // 終日ならfalse
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

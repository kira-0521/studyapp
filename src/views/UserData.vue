<template>
  <v-app>
    <v-main>
      <div class="container__inner">
        <Calendar @calendarClick="viewDate" />
        <div class="user-data" v-if="view">
          <p>{{ studyData[id].nowTime.stringValue }}</p>
          <ul>
            <li>時間: {{ studyData[id].studyTime.integerValue }}時間</li>
            <li>場所: {{ studyData[id].studyArea.stringValue }}</li>
            <li>集中度: {{ studyData[id].studyDensity.stringValue }}</li>
            <li>項目: {{ studyData[id].studyContent.stringValue }}</li>
            <li>{{ studyData[id].nowTime.stringValue }}</li>
          </ul>
          <!-- 動的ルーティング -->
          <router-link :to="'/userdata/' + (Number(id) - 1)">prev</router-link>
          <router-link :to="'/userdata/' + (Number(id) + 1)">next</router-link>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Calendar from "../components/Calendar";
import { mapState } from "vuex";

export default {
  props: ["id"],
  components: {
    Calendar
  },
  data() {
    return {
      view: false
    };
  },
  computed: {
    ...mapState("getpost", ["studyData"])
  },
  methods: {
    viewDate(calendarDate) {
      this.studyData.forEach((data, index) => {
        if (data.nowTime.stringValue === calendarDate) {
          console.log(`date: ${calendarDate} / index: ${index}`);
          this.$router.push({ name: "userdata", params: { id: index } });
          this.view = true;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container__inner {
  display: grid;
  grid-template-rows: 1fr 1fr;
}
@media screen and (min-width: 960px) {
  .container__inner {
    grid-template-columns: 2fr 1fr;
  }
}
</style>

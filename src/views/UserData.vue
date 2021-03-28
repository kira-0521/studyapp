<template>
  <v-app>
    <v-main>
      <div class="container__inner">
        <Calendar />
        <h1>{{ id }}</h1>
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
    </v-main>
  </v-app>
</template>

<script>
import Calendar from "../components/Calendar";
import { mapState, mapActions } from "vuex";

export default {
  props: ["id"],
  components: {
    Calendar
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("getpost", ["studyData"])
  },
  methods: {
    ...mapActions("getpost", ["getStudyData"])
  },
  created() {
    this.getStudyData();
  }
};
</script>

<style></style>

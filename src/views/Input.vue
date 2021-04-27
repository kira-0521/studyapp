<template>
  <div class="input-area">
    <div class="input-area__inner">
      <div class="input-area__title">
        <h1>{{ getNow }}</h1>
      </div>
      <div class="input-area__time">
        <div class="input-area__form-wrap">
          <label for="studyTime">取り組み時間</label>
          <select id="studyTime" v-model.number="fields.studyTime" required>
            <!-- disabledのみ表示されない -->
            <option v-for="n in 16" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
      </div>
      <!-- 仮 -->
      <div class="input-area__area">
        <div class="input-area__form-wrap">
          <label for="studyArea">取り組み場所</label>
          <input
            id="studyArea"
            v-model.trim="fields.studyArea"
            type="text"
            required
          />
        </div>
      </div>
      <div class="input-area__density">
        <div class="input-area__form-wrap">
          <label for="studyDensity">集中力</label>
          <select
            id="studyDensity"
            v-model="fields.studyDensity"
            style="height: 50px;"
            required
          >
            <option value="浅">浅</option>
            <option value="中">中</option>
            <option value="真">真</option>
          </select>
        </div>
      </div>
      <div class="input-area__content">
        <div class="input-area__form-wrap">
          <label for="studyContent">取り組み内容</label>
          <textarea
            id="studyContent"
            v-model="fields.studyContent"
            style="height: 100px;"
            maxlength="30"
            form-wrap="hard"
            cols="15"
          />
        </div>
      </div>
      <button @click="submitStudy" class="input-area__submit">
        記録する
      </button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";

export default {
  // loading画面を無効
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setLoading(false);
    });
  },
  data() {
    return {
      fields: {
        studyTime: 0, // 時間
        studyDensity: "", // 密度
        studyContent: "", // 内容
        studyArea: "" // 場所
      }
    };
  },
  computed: {
    getNow() {
      return dayjs().format("YYYY-MM-DD");
    }
  },
  methods: {
    ...mapActions("getpost", ["setStudyData"]),
    ...mapActions("loading", ["setLoading"]),
    submitStudy() {
      this.fields.nowTime = this.getNow;
      this.setStudyData(this.fields);
      this.fields = {
        studyTime: 0, // 時間
        studyDensity: "", // 密度
        studyContent: "", // 内容
        studyArea: "" // 場所
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/modules/_variables.scss";
@import "../assets/styles/views/_input.scss";
</style>

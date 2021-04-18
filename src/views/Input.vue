<template>
  <div class="input-area">
    <div class="input-area__inner">
      <div class="input-area__title">
        <h1>Study Log</h1>
      </div>
      <div class="input-area__time">
        <label for="studyTime">
          <input id="studyTime" v-model.number="fields.studyTime" required />
        </label>
      </div>
      <!-- 仮 -->
      <div class="input-area__area">
        <label for="studyArea">
          <input
            id="studyArea"
            v-model.trim="fields.studyArea"
            type="text"
            placeholder="勉強場所"
            required
          />
        </label>
      </div>
      <div class="input-area__density">
        <label for="studyDensity">
          <select
            id="studyDensity"
            v-model="fields.studyDensity"
            style="height: 50px;"
            required
          >
            <option disabled value>集中力</option>
            <option value="浅">浅</option>
            <option value="中">中</option>
            <option value="真">真</option>
          </select>
        </label>
      </div>
      <div class="input-area__content">
        <label for="studyContent">
          <textarea
            id="studyContent"
            v-model="fields.studyContent"
            placeholder="勉強内容"
            style="height: 100px;"
            maxlength="30"
            wrap="hard"
            cols="15"
          />
        </label>
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setLoading(false);
    });
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

$ruler: 16px;

label {
  width: 100%;
  display: block;
  margin-right: 10px;
  margin-bottom: $ruler * 1.5;
}

input,
select,
textarea,
button,
h1 {
  letter-spacing: -0.2px;
  text-shadow: 1px 1px 1px $cWhite;
}

input,
select,
textarea,
button {
  border: 0;
  outline: 0;
  font-size: $ruler;
  border-radius: $ruler * 20;
  padding: $ruler;
  background-color: $cBg;
  text-shadow: 1px 1px 0 $cWhite;
}
input,
select,
textarea {
  margin-right: $ruler/2;
  box-shadow: inset 2px 2px 5px $cShadow, inset -5px -5px 10px $cWhite;
  width: 330px;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  appearance: none;
  -webkit-appearance: none;

  &:focus {
    box-shadow: inset 1px 1px 2px $cShadow, inset -1px -1px 2px $cWhite;
  }
}

.content {
  text-align: center;
}

.input-area {
  &__inner {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__title {
    margin-bottom: 30px;

    & > h1 {
      color: $cBlue;
    }
  }

  &__content {
    margin-bottom: 20px;
  }

  &__submit {
    color: $cBlue;
    font-weight: bold;
    box-shadow: -5px -5px 20px $cWhite, 5px 5px 20px $cShadow;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      box-shadow: -2px -2px 5px $cWhite, 2px 2px 5px $cShadow;
    }

    &:active {
      box-shadow: inset 1px 1px 2px $cShadow, inset -1px -1px 2px $cWhite;
    }
  }
}
</style>

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
      <base-button
        @parent-event="submitStudy"
        text-color="#516C9D"
        fontBold="600"
      >
        記録する
      </base-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
import BaseButton from "../components/BaseButton";

export default {
  components: {
    BaseButton
  },
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
$ruler: 16px;

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
  // デフォルトスタイルを無効
  appearance: none;
  -webkit-appearance: none;

  &:focus {
    box-shadow: inset 1px 1px 2px $cShadow, inset -1px -1px 2px $cWhite;
  }
}

label {
  width: 100%;
  display: block;
  color: $cTextReverse;
  margin-bottom: 2%;
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

  &__form-wrap {
    margin-right: 10px;
    margin-bottom: $ruler * 1.5;
    &:focus-within {
      & label {
        color: $cText;
        font-weight: bold;

        &::after {
          font-weight: 400;
          font-size: 15px;
        }
      }
    }
  }

  &__title {
    margin-bottom: 30px;

    & > h1 {
      color: $cMain;
    }
  }

  &__time {
    &:focus-within {
      & label {
        &::after {
          content: "を16時間以内で選択してください。";
        }
      }
    }
  }

  &__area {
    &:focus-within {
      & label {
        &::after {
          content: "を入力してください。";
        }
      }
    }
  }

  &__density {
    &:focus-within {
      & label {
        &::after {
          content: "を３段階の内から選択してください。";
        }
      }
    }
  }

  &__content {
    margin-bottom: 20px;

    &:focus-within {
      & label {
        &::after {
          content: "を30字以内で入力してください。";
        }
      }
    }
  }

  // &__submit {
  //   color: $cMain;
  //   font-weight: bold;
  //   box-shadow: -5px -5px 20px $cWhite, 5px 5px 20px $cShadow;
  //   transition: all 0.2s ease-in-out;
  //   cursor: pointer;
  //   font-weight: 600;

  //   &:hover {
  //     box-shadow: -2px -2px 5px $cWhite, 2px 2px 5px $cShadow;
  //   }

  //   &:active {
  //     box-shadow: inset 1px 1px 2px $cShadow, inset -1px -1px 2px $cWhite;
  //   }
  // }
}
</style>

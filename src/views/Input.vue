<template>
  <div class="input-area">
    <div class="input-area__inner">
      <div class="input-area__title">
        <h1>Study Log</h1>
      </div>
      <div class="input-area__time">
        <label for="studyTime">
          <input id="studyTime" v-model.number="studyTime" required />
        </label>
      </div>
      <!-- 仮 -->
      <div class="input-area__area">
        <label for="studyArea">
          <input
            id="studyArea"
            v-model.trim="studyArea"
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
            v-model="studyDensity"
            style="height: 50px;"
            required
          >
            <option disabled value>集中度</option>
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
            v-model="studyContent"
            placeholder="勉強内容"
            style="height: 100px;"
          />
        </label>
      </div>
      <button @click="submitStudy" class="input-area__submit">
        記録する
      </button>
    </div>
    <!-- <button @click="getLocation" class="input-area_location">
        現在地を取得
      </button> -->
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  data() {
    return {
      studyTime: 0, // 時間
      studyDensity: "", // 密度
      studyContent: "", // 内容
      studyArea: "" // 場所
      // latitude: 0,
      // longitude: 0
    };
  },
  computed: {
    getNow() {
      return dayjs().format("YYYY-MM-DD");
      // const now = new Date();
      // const year = now.getFullYear();
      // const mon = now.getMonth() + 1;
      // const day = now.getDate();
      // const hour = now.getHours();
      // return `${year}年${mon}月${day}日${hour}時`;
    }
  },
  methods: {
    submitStudy() {
      axios
        .post("/posts", {
          fields: {
            studyTime: {
              integerValue: this.studyTime
            },
            studyArea: {
              stringValue: this.studyArea
            },
            studyDensity: {
              stringValue: this.studyDensity
            },
            studyContent: {
              stringValue: this.studyContent
            },
            nowTime: {
              stringValue: this.getNow
            }
            // latitude: {
            //   stringValue: this.latitude
            // },
            // longitude: {
            //   stringValue: this.longitude
            // }
          }
        })
        .then(() => {
          this.latitude = 0;
          this.longitude = 0;
          this.studyTime = undefined;
          this.studyArea = "";
          this.studyDensity = "";
          this.studyContent = "";
        })
        .catch(error => {
          console.log(error.response);
        });
    }
    // getLocation() {
    //   if (!navigator.geolocation) {
    //     alert(
    //       "現在地情報を取得できませんでした。お使いのブラウザでは現在地情報を利用できない可能性があります。エリアを入力してください。"
    //     );
    //     return;
    //   }

    //   const options = {
    //     // より精度の高い位置情報を取得する
    //     enableHighAccuracy: false,
    //     // エラーコールバックが呼び出されるまでの時間
    //     timeout: 5000,
    //     // 位置情報の有効期限
    //     maximumAge: 0
    //   };

    //   // 成功CB・エラーCB
    //   navigator.geolocation.getCurrentPosition(
    //     this.success,
    //     this.error,
    //     options
    //   );
    // },
    // success(position) {
    //   this.latitude = position.coords.latitude;
    //   this.longitude = position.coords.longitude;
    // },
    // error(error) {
    //   switch (error.code) {
    //     case 1: //PERMISSION_DENIED
    //       alert("位置情報の利用が許可されていません");
    //       break;
    //     case 2: //POSITION_UNAVAILABLE
    //       alert("現在位置が取得できませんでした");
    //       break;
    //     case 3: //TIMEOUT
    //       alert("タイムアウトになりました");
    //       break;
    //     default:
    //       alert("現在位置が取得できませんでした");
    //       break;
    //   }
    // }
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

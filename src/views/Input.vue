<template>
  <div class="content">
    <div class="input-area">
      <router-link to="graph" class="graph-link">結果画面へ</router-link>
      <div class="input-area__time">
        <label for="studyTime">
          <input
            id="studyTime"
            v-model="studyTime"
            type="number"
            placeholder="勉強時間"
            required
          />時間
        </label>
      </div>
      <!-- 仮 -->
      <div class="input-area__area">
        <label for="studyArea">
          <input
            id="studyArea"
            v-model="studyArea"
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
            style="width: 150px; height: 30px;"
            required
          >
            <option value="">選択してください</option>
            <option value="薄">薄</option>
            <option value="普">普</option>
            <option value="濃">濃</option>
          </select>
        </label>
      </div>
      <div class="input-area__content">
        <label for="studyContent">
          <textarea
            id="studyContent"
            v-model="studyContent"
            placeholder="勉強内容"
          />
        </label>
      </div>
      <button @click="submitStudy" class="input-area_submit">
        投稿する
      </button>
      <!-- <button @click="getLocation" class="input-area_location">
        現在地を取得
      </button> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

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
      return moment(new Date()).format("YYYY MM DD HH:00:00");
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
              dateValue: this.getNow
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
.content {
  max-width: 1070px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.grahp-link {
  color: cadetblue;
}
label {
  margin: 0 10px 0 0;
}
.input-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  &__time,
  &__density {
    margin-bottom: 20px;
    vertical-align: bottom;
  }

  &__content {
    margin-bottom: 30px;
  }
}
</style>

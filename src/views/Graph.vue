<template>
  <div class="content">
    <router-link to="/input" class="input-link" active-class="link"
      >入力画面へ</router-link
    >
    <div class="list-area">
      <ul v-for="area in separateArea" :key="area" class="list-area__ul">
        <div v-for="value in area" :key="value" class="list-area__ul-inner">
          <li class="list-area__li">{{ value.studyTime.stringValue }}</li>
          <li class="list-area__li">{{ value.studyArea.stringValue }}</li>
          <li class="list-area__li">{{ value.studyDensity.stringValue }}</li>
          <li class="list-area__li">{{ value.studyContent.stringValue }}</li>
          <li class="list-area__li">{{ value.nowTime.stringValue }}</li>
        </div>
      </ul>
    </div>
    <div class="areas">
      <ul class="areas__ul">
        <li v-for="area in areas" :key="area">{{ area }}</li>
      </ul>
    </div>
    <button @click="console">表示</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // レスポンスデータ
      posts: [],
      // 場所
      areas: []
    };
  },
  created() {
    axios
      // postsにオブジェクト格納
      .get("/posts")
      .then(response => {
        let array = response.data.documents;
        for (let i = 0; i < array.length; i++) {
          this.posts.push(array[i].fields);
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  },
  mounted() {
    axios
      .get("/posts")
      // 場所
      .then(response => {
        let locations = [];
        let area = response.data.documents;
        area.forEach(value => {
          locations.push(value.fields.studyArea.stringValue);
        });
        // locations被り削除
        this.areas = [...new Set(locations)];
      });
  },
  computed: {
    separateArea() {
      let sortObj = [];
      const separate = [];
      for (let i = 0; i < this.areas.length; i++) {
        this.posts.forEach(post => {
          // index返す→0
          if (post.studyArea.stringValue.indexOf(this.areas[i]) !== -1) {
            sortObj.push(post);
          }
        });
        separate.push(sortObj);
        sortObj = [];
      }
      return separate;
    }
  },
  methods: {
    console() {
      console.log(this.separateArea);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-link {
  color: cadetblue;
}
.areas {
  &__ul {
    background-color: cadetblue;
  }
}
.list-area {
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  &__ul-inner {
    margin-bottom: 30px;
  }
}
</style>

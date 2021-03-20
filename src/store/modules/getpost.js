import axios from "axios";

const state = {
  studyData: [],
  areas: [],
  density: []
};

const getters = {
  studyData: state => state.studyData,
  areas: state => state.areas,
  density: state => state.density
};

const mutations = {
  setStudyData(state, payload) {
    state.studyData = payload.studyData;
  },
  setArea(state, payload) {
    // 被りなし場所
    state.areas = [...new Set(payload.locations)];
    console.log(state.areas);
  },
  setDensity(state, payload) {
    state.density = [...new Set(payload.density)];
    console.log(payload.density);
  }
};

const actions = {
  // 全体データ、場所、集中度をそれぞれ配列に格納
  async getStudyData({ commit }) {
    const payload = {
      studyData: [],
      locations: [],
      density: []
    };
    await axios.get("/posts").then(res => {
      for (let i = 0; i < res.data.documents.length; i++) {
        payload.studyData.push(res.data.documents[i].fields);
      }
      payload.locations.push(payload.studyData.studyArea.stringValue);
      payload.density.push(payload.studyData.studyDensity.stringValue);
    });
    commit("setStudyData", payload);
    commit("setArea", payload);
    commit("setDensity", payload);
    // created時に既存の配列に新しいデータのみpushするため
    // のちに条件分岐させた方がいい
    payload.studyData = [];
    payload.locations = [];
    payload.density = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

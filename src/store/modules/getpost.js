import axios from "axios";

const state = {
  studyData: [],
  area: [],
  density: []
};

const getters = {
  studyData: state => state.studyData,
  area: state => state.area,
  density: state => state.density
};

const mutations = {
  setStudyData(state, payload) {
    state.studyData = payload.studyData;
  },
  // 被りなし場所
  setArea(state, payload) {
    state.area = [...new Set(payload.area)];
  },
  // 被りなし集中
  setDensity(state, payload) {
    state.density = [...new Set(payload.density)];
  }
};

const actions = {
  // データ、場所、集中度をそれぞれ配列に格納
  async getStudyData({ commit }) {
    const payload = {
      studyData: [],
      area: [],
      density: []
    };
    await axios.get("/posts").then(res => {
      for (let i = 0; i < res.data.documents.length; i++) {
        payload.studyData.push(res.data.documents[i].fields);
      }
      payload.studyData.forEach(data => {
        payload.area.push(data.studyArea.stringValue);
        payload.density.push(data.studyDensity.stringValue);
      });
    });
    // .then(() => {

    // })
    // .then(() => {
    //   payload.studyData.forEach(data => {
    //     payload.density.push(data.studyDensity.stringValue);
    //   });
    // });
    commit("setStudyData", payload);
    commit("setArea", payload);
    commit("setDensity", payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

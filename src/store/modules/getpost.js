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
  setArea(state, areas) {
    // 被りなし場所
    state.areas = [...new Set(areas)];
  },
  setDensity(state, density) {
    state.density = [...new Set(density)];
  }
};

const actions = {
  // 全体データ、場所、集中度をそれぞれ配列に格納
  async getStudyData({ commit }) {
    const payload = {
      studyData: []
    };
    await axios.get("/posts").then(res => {
      for (let i = 0; i < res.data.documents.length; i++) {
        payload.studyData.push(res.data.documents[i].fields);
      }
    });
    commit("setStudyData", payload);
    // created時に既存の配列に新しいデータのみpushするため
    // のちに条件分岐させた方がいい
    payload.studyData = [];
  },
  async setArea({ commit }) {
    const areas = [];
    await axios.get("./posts").then(res => {
      for (let i = 0; i < res.data.documents.length; i++) {
        areas.push(res.data.documents[i].fields.studyArea.stringValue);
      }
    });
    commit("setArea", areas);
  },
  async setDensity({ commit }) {
    const density = [];
    await axios.get("./posts").then(res => {
      for (let i = 0; i < res.data.documents.length; i++) {
        density.push(res.data.documents[i].fields.studyDensity.stringValue);
      }
    });
    commit("setDensity", density);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

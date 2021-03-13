import axios from "axios";

const state = {
  studyData: [],
  areas: []
};

const getters = {
  studyData: state => state.studyData,
  areas: state => state.areas
};

const mutations = {
  setStudyData(state, payload) {
    state.studyData = payload.studyData;
  },
  setArea(state, locations) {
    // 被りなし場所
    state.areas = [...new Set(locations)];
  }
};

const actions = {
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
    payload.studyData = [];
  },
  async setArea({ commit }) {
    const locations = [];
    await axios.get("/posts").then(res => {
      res.data.documents.forEach(value => {
        locations.push(value.fields.studyArea.stringValue);
      });
    });
    commit("setArea", locations);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

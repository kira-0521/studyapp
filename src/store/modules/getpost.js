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
    console.log(state.studyData);
  },
  setAreas(state, locations) {
    console.log(locations);
    state.areas = [...new Set(locations)];
  }
};

const actions = {
  async getData({ commit }) {
    const payload = {
      studyData: []
    };
    // const array = [];
    await axios
      // postsにオブジェクト格納
      .get("/posts")
      .then(res => {
        for (let i = 0; i < res.data.documents.length; i++) {
          payload.studyData.push(res.data.documents[i].fields);
        }
      });
    commit("setStudyData", payload);
  },
  async setArea({ commit }) {
    let locations = [];
    await axios.get("/posts").then(res => {
      res.data.documents.forEach(value => {
        locations.push(value.fields.studyArea.stringValue);
      });
    });
    commit("setAreas", locations);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};

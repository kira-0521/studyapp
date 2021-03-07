import axios from "axios";

const state = {
  studyData: []
};

const mutations = {
  responsePosts(state, payload) {
    state.studyData = payload.data;
    console.log(state.studyData);
  }
};

const actions = {
  async getData({ commit }) {
    const payload = {
      data: []
    };
    // const array = [];
    await axios
      // postsにオブジェクト格納
      .get("/posts")
      .then(res => {
        for (let i = 0; i < res.data.documents.length; i++) {
          payload.data.push(res.data.documents[i].fields);
        }
      });
    commit("responsePosts", payload);
  }
};

export default {
  state,
  mutations,
  actions,
  namespaced: true
};

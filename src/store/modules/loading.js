const state = {
  loading: false
};

const mutations = {
  toggle(state) {
    state.loading = !state.loading;
  }
};

const actions = {
  toggle({ commit }) {
    commit("toggle");
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

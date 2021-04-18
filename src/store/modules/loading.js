const state = {
  loading: false
};

const mutations = {
  setLoading(state, bool) {
    state.loading = bool;
  }
};

const actions = {
  setLoading({ commit }, bool) {
    commit("setLoading", bool);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

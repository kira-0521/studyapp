const state = {
  loading: false
};

const mutations = {
  setLoading(state, boolean) {
    state.loading = boolean;
  }
};

const actions = {
  setLoading({ commit }, boolean) {
    commit("setLoading", boolean);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

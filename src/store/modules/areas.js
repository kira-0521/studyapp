const state = {
  areas: []
};

const getters = {
  areas: state => state.areas
};

export default {
  state,
  getters,
  namespaced: true
}
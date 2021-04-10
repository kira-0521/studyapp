import firebase from "firebase";

const state = {
  // ユーザーオブジェクトが入る
  login_user: null
};

const getters = {
  userName: state => (state.login_user ? state.login_user.userName : ""),
  photoURL: state => (state.login_user ? state.login_user.photoURL : "")
};

const mutations = {
  setLoginUser(state, user) {
    state.login_user = user;
  },
  deleteLoginUser(state) {
    state.login_user = null;
  }
};

const actions = {
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // 自動でグーグルの認証画面に飛ぶ
    firebase.auth().signInWithRedirect(provider);
  },
  logout() {
    // firebaseのサインアウトメソッド
    firebase.auth().signOut();
  },
  setLoginUser({ commit }, user) {
    commit("setLoginUser", user);
  },
  deleteLoginUser({ commit }) {
    commit("deleteLoginUser");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

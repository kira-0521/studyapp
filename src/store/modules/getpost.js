import firebase from "firebase";

const state = {
  studyData: [],
  login_user: null
};

const getters = {
  setArea: function(state) {
    const area = [];
    state.studyData.forEach(data => {
      area.push(data.studyArea);
    });
    return [...new Set(area)];
  },
  setDensity: function(state) {
    const density = [];
    state.studyData.forEach(data => {
      density.push(data.studyDensity);
    });
    return [...new Set(density)];
  },
  userName: state => (state.login_user ? state.login_user.userName : ""),
  photoURL: state => (state.login_user ? state.login_user.photoURL : ""),
  uid: state => (state.login_user ? state.login_user.uid : null)
};

const mutations = {
  getStudyData(state, studyData) {
    state.studyData = studyData;
  },
  setLoginUser(state, user) {
    state.login_user = user;
  },
  deleteLoginUser(state) {
    state.login_user = null;
    state.studyData = [];
  }
};

const actions = {
  setStudyData({ getters }, fields) {
    if (getters.uid) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/posts`)
        .add(fields);
    }
  },
  // データ取得
  // ユーザーがログインしたことを確認して行わなければいけないため非同期的に書く
  getStudyData({ commit, getters }) {
    const studyData = [];
    firebase
      .firestore()
      .collection(`users/${getters.uid}/posts`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => studyData.push(doc.data()));
      });
    commit("getStudyData", studyData);
  },
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // 自動でグーグルの認証画面
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

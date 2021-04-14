import firebase from "firebase";

// 各データをgettersに格納したほうがいいかも

const state = {
  studyData: [],
  area: [],
  density: [],
  login_user: null
};

const getters = {
  setArea: state => [...new Set(state.area)],
  setDensity: state => [...new Set(state.density)],
  userName: state => (state.login_user ? state.login_user.userName : ""),
  photoURL: state => (state.login_user ? state.login_user.photoURL : ""),
  uid: state => (state.login_user ? state.login_user.uid : null)
};

const mutations = {
  getStudyData(state, payload) {
    state.studyData = payload.studyData;
  },
  setArea(state, payload) {
    state.area = payload.area;
  },
  setDensity(state, payload) {
    state.density = payload.density;
  },
  setLoginUser(state, user) {
    state.login_user = user;
  },
  deleteLoginUser(state) {
    state.login_user = null;
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
  getStudyData({ getters }) {
    // const payload = {
    //   studyData: [],
    //   area: [],
    //   density: []
    // };
    firebase
      .firestore()
      .collection(`users/${getters.uid}}/posts`)
      .get()
      .then(snapshot => {
        console.log(snapshot);
        // for (let i = 0; i < snapshot.data.documents.length; i++) {
        //   payload.studyData.push(snapshot.data.documents[i].fields);
        // }
        // payload.studyData.forEach(data => {
        //   payload.area.push(data.studyArea.stringValue);
        //   payload.density.push(data.studyDensity.stringValue);
        // });
      });
    // commit("getStudyData", payload);
    // commit("setArea", payload);
    // commit("setDensity", payload);
  },
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

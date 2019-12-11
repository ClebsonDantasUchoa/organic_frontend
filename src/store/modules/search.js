import firebase from "firebase"

const state = {
  usersSearched: [],
  userProfileSearched: null,
  community: []
}

const mutations = {
  setUserProfileSearched: (state, payload) => {
    state.userProfileSearched = payload
  },
  setCommunity: (state, payload) => {
    console.log("payload ", payload)
    state.community = payload
  }
}

const actions = {
  async searchUserProfile({ commit }, uid) {
    let db = firebase.firestore()

    await db
      .collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        commit("setUserProfileSearched", doc.data())
      })
  },

  async searchCommunity({commit}){
    let db = firebase.firestore()

    await db.collection("users").get().then(function(querySnapshot) {
      let users = []
      querySnapshot.forEach(function(doc) {
        users.push(doc.data())
        //console.log(doc.id, " => ", doc.data());
      });
      commit("setCommunity", users)
    });
  }
}

const getters = {
  getUsers: state => state.users,
  getUserProfileSearched: state => state.userProfileSearched,
  getCommunity: state => state.community
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import firebase from "firebase"

const state = {
  usersSearched: [],
  userProfileSearched: null
}

const mutations = {
  setUserProfileSearched: (state, payload) => {
    state.userProfileSearched = payload
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
  }
}

const getters = {
  getUsers: state => state.users,
  getUserProfileSearched: state => state.userProfileSearched
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

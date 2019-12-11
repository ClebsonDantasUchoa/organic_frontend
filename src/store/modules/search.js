import firebase from "firebase"

const state = {
  community: [],
  userProfileSearched: null
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
    // commit("setUserProfileSearched", null)

    await db
      .collection("users")
      .doc(uid)
      .onSnapshot(doc => {
        let data = doc.data()

        data.userFollow.get().then(uFollow => {
          data["userFollow"] = uFollow.data()
          commit("setUserProfileSearched", data)
        })
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
  getCommunity: state => state.community,
  getUserProfileSearched: state => state.userProfileSearched,
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

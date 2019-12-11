import firebase from "firebase"

const state = {
  community: [],
  followers: [],
  following: [],
  userProfileSearched: null
}

const mutations = {
  setUserProfileSearched: (state, payload) => {
    state.userProfileSearched = payload
  },

  setCommunity: (state, payload) => {
    console.log("payload ", payload)
    state.community = payload
  },

  setFollowers: (state, payload) => {
    state.followers = payload
  },

  setFollowing: (state, payload) => {
    state.following = payload
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

  async findFollowers({ commit }, followersRef) {
    let users = []
    for (const follower of followersRef) {
      await follower.get().then(user => {
        console.log(user.data())
        users.push(user.data())
      })
    }
    commit("setFollowers", users)
  },

  async findFollowing({ commit }, followingRef) {
    let users = []
    for (const follower of followingRef) {
      await follower.get().then(user => {
        console.log(user.data())
        users.push(user.data())
      })
    }
    commit("setFollowing", users)
  },

  async searchCommunity({ commit }) {
    let db = firebase.firestore()

    await db
      .collection("users")
      .get()
      .then(function(querySnapshot) {
        let users = []
        querySnapshot.forEach(function(doc) {
          users.push(doc.data())
          //console.log(doc.id, " => ", doc.data());
        })
        commit("setCommunity", users)
      })
  }

}

const getters = {
  getCommunity: state => state.community,
  getUserProfileSearched: state => state.userProfileSearched,
  getFollowers: state => state.followers,
  getFollowing: state => state.following
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

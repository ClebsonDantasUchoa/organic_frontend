const state = {
  users: [
    {
      _id: "Zsbb6hL2e2UQ0NcUOaue8af9CZl1",
      created: new Date(),
      description: "qqqqq",
      email: "aaaa@aaaa.com",
      followers: 1,
      following: 0,
      timeline: "",
      userFollow: [],
      name: "Fulano 1"
    },
    {
      _id: "Ssbb6hL2e2uhjdsiu$Oaue8af9CAb4",
      created: new Date(),
      description: "qqqqq",
      email: "a@aaaa.com",
      followers: 1,
      following: 0,
      timeline: "",
      userFollow: [],
      name: "Fulano 1"
    }
  ]
}

const mutations = {}

const actions = {
  // searchUsers({commit}, payload) {
  //   let db = firebase.firestore()

  //   db.collection("users")
  // }
}

const getters = {
  getUsers: state => state.users
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

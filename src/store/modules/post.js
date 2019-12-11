import firebase from "firebase";

const state = {
  likes: []
}

const mutations = {
  setUsersWhoLiked: (state, payload) => {
    state.likes = payload
  }
}

const actions = {
  async searchUsersWhoLiked({commit}, post_id){
    let db = firebase.firestore()

    await db
      .collection("post")
      .doc(post_id)
      .onSnapshot(function(snapshot){
        let users = []
        snapshot
          .data().likes
          .forEach(function(user){
            let user_id = user.path.split("user/")[1]
            db.collection("users")
              .doc(user_id)
              .get()
              .then(doc => {
                let data = doc.data()
                users.push(data)
              })
          })
          console.log(users)
          commit("setUsersWhoLiked", users)
      })
  }
}

const getters = {
  getUsersWhoLikedList: state => state.likes
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

import firebase from "firebase"

const state = {
  user: {
    loggedIn: false,
    data: null
  }
}

const mutations = {
  set_logged_in(state, value) {
    state.user.loggedIn = value
  },
  set_user(state, data) {
    state.user.data = data
  }
}

const actions = {
  fetchUser({ commit }, user) {
    commit("set_logged_in", user !== null)
    if (user) {
      commit("set_user", {
        displayName: user.displayName,
        email: user.email
      })
    } else {
      // localStorage.setItem("uemail", null)
      commit("set_user", null)
    }
    console.log("*************USER*****************")
    if (user != null) {
      console.log(user.displayName)
      console.log(user.email)
    } else {
      console.log("Usuário não logado")
    }
    console.log("*********************************")
  },

  // eslint-disable-next-line no-unused-vars
  async followSomeone({ dispatch }, payload) {
    let db = firebase.firestore()

    let userRef = await db.collection("users").doc(payload.user_following)

    await db
      .collection("user_follow")
      .doc(payload.uid)
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(userRef)
      })
      .catch(e => {
        console.log(e.message)
      })
  },

  // eslint-disable-next-line no-unused-vars
  async unfollowSomeone({ dispatch }, payload) {
    let db = firebase.firestore()

    let userRef = await db.collection("users").doc(payload.user_unfollowing)

    await db
      .collection("user_follow")
      .doc(payload.uid)
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(userRef)
      })
      .catch(e => {
        console.log(e.message)
      })
  }
}

const getters = {
  getUser(state) {
    return state.user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

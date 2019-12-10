const state = {
  user: {
    loggedIn: false,
    data: null
  }
}

const mutations = {
  set_logged_in(state, value) {
    state.user.loggedIn = value;
  },
  set_user(state, data) {
    state.user.data = data;
  }
}

const actions = {
  fetchUser({ commit }, user) {
    commit("set_logged_in", user !== null);
    if (user) {
      commit("set_user", {
        displayName: user.displayName,
        email: user.email
      });
      
    } else {
      // localStorage.setItem("uemail", null)
      commit("set_user", null);
    }
    console.log("*************USER*****************")
    if(user != null){
      console.log(user.displayName)
      console.log(user.email)
    }else{
      console.log("Usuário não logado")
    }
    console.log("*********************************")
  }
}

const getters = {
  getUser(state){
    return state.user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

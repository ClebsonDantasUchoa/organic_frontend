import firebase from "firebase"

const state = {
  timelinePosts: []
}

const mutations = {
  // pushPosts: (state, payload) => {
  //   state.posts.push(payload)
  // },

  pushCommentInPosts: (state, payload) => {
    let post = state.posts.filter(post => post._id === payload.post_id)[0]
    post.comments.available.push(payload)
    post.comments.total += 1
    console.log(state.posts)
  },

  pushLikeInPosts: (state, payload) => {
    let post = state.posts.filter(post => post._id === payload.post_id)[0]
    post.likes += 1
    console.log(state.posts)
  },

  setTimelinePosts: (state, payload) => {
    state.timelinePosts = payload
  }
}

const actions = {
  // publishContent: (context, payload) => {
  //   console.log(payload)
  //   context.commit("pushPosts", payload)
  // },

  publishComment: (context, payload) => {
    context.commit("pushCommentInPosts", payload)
  },

  publishLike: (context, payload) => {
    context.commit("pushLikeInPosts", payload)
  },

  async searchTimelinePosts({ commit }) {
    let db = firebase.firestore()

    await db
      .collection("timeline")
      .doc(localStorage.getItem("uid"))
      .onSnapshot(function(snapshot) {
        let posts = []
        snapshot
          .data()
          .posts.reverse()
          .forEach(function(post) {
            let post_id = post.path.split("post/")[1]
            db.collection("post")
              .doc(post_id)
              .get()
              .then(doc => {
                let data = doc.data()
                data["event_date"] = new Date(
                  data["event_date"].seconds * 1000
                ).toISOString()
                posts.push(data)
              })
          })
        commit("setTimelinePosts", posts)
      })
  }
}

const getters = {
  // getPosts: state => state.posts,
  getTimelinePosts: state => state.timelinePosts
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

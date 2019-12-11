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
    let post = state.timelinePosts.filter(post => post._id === payload.post_id)[0]
    post.likes.push(payload.userRef)
  },

  popLikeInPosts: (state, payload) => {
    let post = state.timelinePosts.filter(post => post._id === payload.post_id)[0]
    post.likes = post.likes.filter(a => a.path !== payload.userRef.path)
  },

  setTimelinePosts: (state, payload) => {
    state.timelinePosts = payload
  }
}

const actions = {
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
              .then(async doc => {
                let data = doc.data()

                await data.author.get().then(author => {
                  data["author"] = author.data()
                })

                let date = new Date(data["event_date"].seconds * 1000)
                data["event_date"] = date.toISOString()
                posts.push(data)
              })
          })
console.log(posts)
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

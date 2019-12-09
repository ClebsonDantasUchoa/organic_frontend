const state = {
  posts: [
    {
      _id: "1",
      autorImage: "https://thispersondoesnotexist.com/image",
      autor: "Jucelino Abstract",
      postImage: require("../../assets/1.jpg"),
      message: "Colhi hoje pela manhã na minha horta.",
      event_date: "2019-10-09T09:10:02.000Z",
      likes: 0,
      comments: {
        total: 1,
        available: [
          {
            _id: "12",
            post_id: "1",
            author: { name: "Michael Grubs" },
            text: "Preciso começar a cultivar as minhas também.",
            event_date: new Date(),
            likes: 0
          }
        ]
      }
    },
    {
      _id: "2",
      autorImage: "https://thispersondoesnotexist.com/image",
      autor: "Macchiato Soul",
      postImage: require("../../assets/2.jpg"),
      message:
        "Hoje eu vivo uma vida diferente de tudo que já vivi, vou contar um pouco mais da minha experiência... ver mais.",
      event_date: "2019-10-09T09:10:02.000Z",
      likes: 0,
      comments: {
        total: 0,
        available: []
      }
    },
    {
      _id: "3",
      autorImage: "https://thispersondoesnotexist.com/image",
      autor: "Mil Grau",
      postImage: require("../../assets/3.jpg"),
      message:
        "Bem pessoal, hoje vou falar de uma receita nova que aprendi com um amigo.",
      event_date: "2019-10-09T09:10:02.000Z",
      likes: 0,
      comments: {
        total: 0,
        available: []
      }
    }
  ]
}

const mutations = {
  pushPosts: (state, payload) => {
    state.posts.push(payload)
  },

  pushCommentInPosts: (state, payload) => {
    let post = state.posts.filter(post => post._id === payload.post_id)[0]
    post.comments.available.push(payload)
    post.comments.total += 1
    console.log(state.posts)
  }
}

const actions = {
  publishContent: (context, payload) => {
    console.log(payload)
    context.commit("pushPosts", payload)
  },

  publishComment: (context, payload) => {
    context.commit("pushCommentInPosts", payload)
  }
}

const getters = {
  getPosts: state => state.posts
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

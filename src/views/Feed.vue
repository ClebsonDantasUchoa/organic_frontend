<template>
  <div class="feed">
    <div class="feed__header">
      <PostInput @submit="publishContent" />
    </div>

    <div class="feed__content">
      <PostCard v-for="(post, key) in posts " :post="post" :key="key" />
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
import PostInput from "@/components/PostInput";
import { mapGetters } from "vuex";
import firebase from "firebase";
let db = firebase.firestore();

export default {
  components: {
    PostCard,
    PostInput
  },

  data() {
    return {
      // postList: []
    };
  },

  computed: {
    ...mapGetters({
      posts: "timeline/getPosts",
      user: "user/getUser"
    })
  },

  // watch: {
  //   posts: {
  //     handler: function() {
  //       console.log("posts");
  //       // this.postList = [];
  //       this.postList = this.posts
  //     },
  //     deep: true
  //   }
  // },

  methods: {
    publishContent(content) {
      // let post = {
      //   autorImage: "https://thispersondoesnotexist.com/image",
      //   autor: "Bla",
      //   postImage: "",
      //   message: content,
      //   event_date: "2019-10-09T09:10:02.000Z",
      //   likes: 0,
      //   comments: {
      //     total: 0,
      //     available: []
      //   }
      // };

      let uid = localStorage.getItem("uid")
      if(uid == null) return

      let post = {
        autorImage: "",
        autor: localStorage.getItem("uname"),
        user_id: uid,
        postImage: "",
        message: content,
        event_date: new Date(),
        likes: []
      }

      db.collection("post").add(post).then(function(docRef) {
        db.collection("post").doc(docRef.id).update({
          _id: docRef.id
        })
        post["_id"] = docRef.id
        console.log("Post created with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding Post: ", error);
      });
      post["comments"] = {
        total: 0,
        available: []
      }
      this.$store.dispatch("timeline/publishContent", post);
    },
    async getPost(postId) {
      postId = "rMhpKAgu0deW2D35fHzy";
      this.loading = true;
      if (this.error) return;
      var docRef = db.collection("post").doc(postId);
      docRef
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log("Document data:", doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  },

  mounted() {
    // this.postList = this.posts;
  }
};
</script>

<style lang="sass" scoped>
.feed
  padding: 25px 15px

  .post-card
    margin-bottom: 20px

  &__header
    margin-bottom: 20px
  // background-color: #f7f7f7
</style>
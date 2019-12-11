<template>
  <div class="feed">
    <div class="feed__header">
      <PostInput :allowImage="true" @submit="publishContent" />
    </div>

    <div class="feed__content">
      <PostCard v-for="(post, key) in timeline " :post="post" :key="key" />
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
import PostInput from "@/components/PostInput";
import { mapGetters } from "vuex";
import firebase from "firebase";
import uuuid from "uuid/v4";

let db = firebase.firestore();
let storage = firebase.storage();

export default {
  components: {
    PostCard,
    PostInput
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      posts: "timeline/getPosts",
      user: "user/getUser",
      timeline: "timeline/getTimelinePosts"
    })
  },

  methods: {
    async publishContent(content) {
      let uid = localStorage.getItem("uid");
      if (uid == null) return;

      let post = {
        _id: uuuid(),
        user_id: uid,
        postImage: "",
        author: "",
        message: content.text,
        event_date: new Date(),
        likes: [],
        comments: []
      };

      if (content.image) {
        let ref = storage
          .ref("posts/")
          .child(post._id)
          .child("image");

        await ref
          .put(content.image.file, content.image.metadata)
          .then(async function() {
            await ref.getDownloadURL().then(response => {
              post["postImage"] = response;
            });
          });
      }

      post["author"] = db.collection("users").doc(uid);


      db.collection("post")
        .doc(post._id)
        .set(post)
        .then(() => {})
        .catch(function(error) {
          console.error("Error adding Post: ", error);
        });
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
    // this.$store.dispatch("user/followSomeone", {
    //   user_following: "xpbaDfkP1IcBZoLdEcDkTkkEGO22",
    //   uid: "JIeOivfQvfUZwFNEkyeM7XeLh8i2"
    // })

    // this.$store.dispatch("user/followSomeone", {
    //   user_following: "TZCyrHOClAen1Q1G1i55HXi4vg62",
    //   uid: "JIeOivfQvfUZwFNEkyeM7XeLh8i2"
    // });

    // this.$store.dispatch("user/followSomeone", {
    //   user_following: "FZjsDiW3U03j21Ap7QjT",
    //   uid: "JIeOivfQvfUZwFNEkyeM7XeLh8i2"
    // })

    // this.$store.dispatch("user/unfollowSomeone", {
    //   user_unfollowing: "TZCyrHOClAen1Q1G1i55HXi4vg62",
    //   uid: "JIeOivfQvfUZwFNEkyeM7XeLh8i2"
    // })

    this.$store.dispatch("timeline/searchTimelinePosts");
  }
};
</script>

<style lang="sass" scoped>
.feed
  padding: 25px 15px
  margin-bottom: 25px

  .post-card
    margin-bottom: 20px

  &__header
    margin-bottom: 20px
  // background-color: #f7f7f7
</style>
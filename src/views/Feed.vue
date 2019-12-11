<template>
  <div class="feed">
    <div class="feed__header">
      <PostInput @submit="publishContent" />
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
let db = firebase.firestore();

export default {
  components: {
    PostCard,
    PostInput
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapGetters({
      posts: "timeline/getPosts",
      user: "user/getUser",
      timeline: "timeline/getTimelinePosts"

    })
  },

  methods: {
    
    publishContent(content) {

      let uid = localStorage.getItem("uid");
      if (uid == null) return;

      let post = {
        autorImage: "",
        autor: localStorage.getItem("uname"),
        user_id: uid,
        postImage: "",
        message: content,
        event_date: new Date(),
        likes: []
      }

      db.collection("post")
        .add(post)
        .then(function(docRef) {
          db.collection("post")
            .doc(docRef.id)
            .update({
              _id: docRef.id
            });
          post["_id"] = docRef.id;
          console.log(post);
          console.log("Post created with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding Post: ", error);
        });

      post["comments"] = {
        total: 0,
        available: []
      };

      this.$store.dispatch("timeline/publishContent", post);
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

    this.$store.dispatch("timeline/searchTimelinePosts")
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
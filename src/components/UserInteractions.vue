<template>
  <div class="user-interactions">
    <Modal @close="closeCommentModal" :isActive="modalComment">
      <div class="tile is-ancestor">
        <div class="tile is-parent" v-if="post_image">
          <div class="tile is-child">
            <img :src="post_image" class="post-img" />
          </div>
        </div>
        <div class="tile is-parent is-vertical">
          <div class="tile is-child">
            <div class="icon" @click="openCommentModal">
              <i class="far fa-comment"></i>
            </div>
            {{comments.available.length}} comentários
          </div>
          <div class="tile is-child">
            <div v-for="(comment, key) in comments.available" :key="key">
              <Comment :comment="comment"></Comment>
            </div>
            <PostInput placeholder="Escreva um comentário..." @submit="publishComment" />
          </div>
        </div>
      </div>
    </Modal>

    <Modal @close="closeLikeModal" :isActive="modalLike">
      <div v-for="(user, key) in usersWhoLiked" :key="key" class="usersWhoLikedInfo">
        <figure class="image is-48x48">
          <img class="my-img" v-if="user.profileImg" :src="user.profileImg" />
          <img v-else src="../assets/user.png" alt="Avatar" />
        </figure>
        <p>{{ user.name }}</p>
      </div>
    </Modal>

    <div class="user-interactions__buttons">
      <div class="icon" @click="postRating" :class="{'icon--liked':liked}">
        <i class="fab fa-gratipay"></i>
      </div>
      {{likes.length}}
      <span @click="openLikeModal">pessoas que curtiram</span>
    </div>

    <!-- <div v-if="comments.available.length">
      <Comment :comment="comments.available[0]"></Comment>
    </div>-->

    <div class="user-interactions__post-input">
      <PostInput
        placeholder="Escreva um comentário..."
        @submit="publishComment"
        @textAreaFocus="openCommentModal"
      />
    </div>
  </div>
</template>

<script>
import PostInput from "@/components/PostInput";
import Modal from "@/components/Modal";
import { mapGetters } from "vuex";
import Comment from "@/components/Comment";
import firebase from "firebase";
let db = firebase.firestore();

export default {
  components: {
    Comment,
    Modal,
    PostInput
  },

  props: {
    post_id: {
      type: String,
      required: true
    },
    likes: {
      type: Array,
      required: true
    },
    // comments: {
    //   type: Object,
    //   required: true
    // },
    post_image: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      uid: localStorage.getItem("uid"),
      modalComment: false,
      liked: false,
      modalLike: false,
      comments: {
        available: []
      }
    };
  },

  watch: {
    usersWhoLiked() {
      this.isLiked();
    }
  },

  computed: {
    ...mapGetters({
      usersWhoLiked: "post/getUsersWhoLikedList"
    })
  },

  methods: {
    isLiked() {
      let usersWhoLiked = this.likes.map(user => user.path.split("user/")[1]);

      this.liked = usersWhoLiked.includes(this.uid);
    },

    publishComment(text) {
      let comment = {
        post_id: this.post_id,
        author: db.collection("users").doc(localStorage.getItem("uid")),
        user_id: localStorage.getItem("uid"),
        text: text,
        event_date: new Date(),
        likes: 0
      };

      db.collection("comments")
        .add(comment)
        .then(function(docRef) {
          db.collection("comments")
            .doc(docRef.id)
            .update({
              _id: docRef.id
            });
          comment["_id"] = docRef.id;
          console.log("Comment created with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding Comment: ", error);
        });

      this.$store.dispatch("timeline/publishComment", comment);
    },

    async openCommentModal() {
      this.modalComment = true;
      let commentsOfPost = [];
      let post_id = this.post_id;
      let comments = this.comments;

      await db.collection("comments").onSnapshot(function(querySnapshot) {
        commentsOfPost = [];
        querySnapshot.forEach(async function(doc) {
          if (doc.data().post_id == post_id) {
            let data = doc.data();
            let date = new Date(data["event_date"].seconds * 1000);
            data["event_date"] = date.toISOString();

            await data.author.get().then(aut => {
              data["author"] = aut.data()
            })

            commentsOfPost.push(data);
          }
          comments.available = commentsOfPost;
        });
      });

      console.log("Comments avaiable :", this.comments.available);
    },

    closeCommentModal() {
      this.modalComment = false;
    },

    async postRating() {
      let userRef = await db
        .collection("user")
        .doc(localStorage.getItem("uid"));
      if (this.liked === true) {
        this.liked = false;
        await db
          .collection("post")
          .doc(this.post_id)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(userRef)
          })
          .then(() => {
            this.liked = false;
            this.$store.commit("timeline/popLikeInPosts", {
              post_id: this.post_id,
              userRef: userRef
            });
          })
          .catch(e => {
            console.log("Error to like: ", e.message);
            this.liked = true;
          });
      } else {
        this.liked = true;
        await db
          .collection("post")
          .doc(this.post_id)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(userRef)
          })
          .then(() => {
            this.$store.commit("timeline/pushLikeInPosts", {
              post_id: this.post_id,
              userRef: userRef
            });
            this.liked = true;
            this.$emit("liked");
          })
          .catch(e => {
            this.liked = false;
            console.log("Error to unlike: ", e.message);
          });
      }
    },

    openLikeModal() {
      this.$store.dispatch("post/searchUsersWhoLiked", this.post_id);
      this.modalLike = true;
    },

    closeLikeModal() {
      this.modalLike = false;
    }
  },

  mounted() {
    this.isLiked();
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/css/mixins"
.my-img
  height: 48px
  width: 48px
  border-radius: 100%
  object-fit: cover

.user-interactions

  .usersWhoLikedInfo
    display: flex
    align-items: center

  .post-img
    border-radius: 5px

  &__buttons
    padding: 10px 0
    .icon
      cursor: pointer
      &--liked
        color: red

  &__post-input
    .post-input
      box-shadow: none
      padding: 0
</style>
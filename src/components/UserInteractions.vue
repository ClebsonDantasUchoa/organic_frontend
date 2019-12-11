<template>
  <div class="user-interactions">
    <Modal @close="closeCommentModal" :isActive="modalComment">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child" v-if="post_image">
            <img :src="post_image" class="post-img" />
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child">
            <!-- <div v-for="(comment, key) in comments.available" :key="key">
              <Comment :comment="comment"></Comment>
            </div> -->
            <PostInput placeholder="Escreva um comentário..." @submit="publishComment" />
          </div>
        </div>
      </div>
      
    </Modal>

    <div class="user-interactions__buttons">
      <div class="icon" @click="postRating" :class="{'icon--liked':liked}">
        <i class="fab fa-gratipay"></i>
      </div>
      {{likes}}
      <div class="icon" @click="openCommentModal">
        <i class="far fa-comment"></i>
      </div>
      <!-- {{comments.total}} -->
    </div>
    
    <!-- <div v-if="comments.available.length">
      <Comment :comment="comments.available[0]"></Comment>
    </div> -->

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
// import Comment from "@/components/Comment";
import firebase from "firebase";
let db = firebase.firestore()

export default {
  components: {
    // Comment,
    Modal,
    PostInput
  },

  props: {
    post_id: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
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
      modalComment: false,
      liked: false
    };
  },
  methods: {
    publishComment(text) {
      // let comment = {
      //   _id: "12",
      //   post_id: this.post_id,
      //   author: { name: "Michael Grubs" },
      //   text: text,
      //   event_date: new Date(),
      //   likes: 0
      // };

      let comment = {
        post_id: this.post_id,
        author: { name: localStorage.getItem("uname")},
        user_id: localStorage.getItem("uid"),
        text: text,
        event_date: new Date(),
        likes: 0
      }

      db.collection("comments").add(comment).then(function(docRef) {
        db.collection("comments").doc(docRef.id).update({
          _id: docRef.id
        })
        comment["_id"] = docRef.id
        console.log("Comment created with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding Comment: ", error);
      });

      this.$store.dispatch("timeline/publishComment", comment);
    },

    openCommentModal() {
      this.modalComment = true;
    },

    closeCommentModal() {
      this.modalComment = false;
    },

    async postRating(){ 
      let userRef = await db.collection("user").doc(localStorage.getItem("uid"))
      if(this.liked===true){
        this.liked = false
        //await db.collection("post").doc(this.post_id).update({
        await db.collection("post").doc("SNdC3ruoirxDWKla3Za7").update({
          likes: firebase.firestore.FieldValue.arrayRemove(userRef)
        }).then(() => {
          this.liked = false;
        })
        .catch(e => {
          console.log("Error to like: ", e.message)
          this.liked = true
        })  
      }
      else{
        this.liked = true;
        //await db.collection("post").doc(this.post_id).update({
        await db.collection("post").doc("SNdC3ruoirxDWKla3Za7").update({
          likes: firebase.firestore.FieldValue.arrayUnion(userRef)
        }).then(() => {
          this.liked = true;
          this.$emit("liked");
        }).catch(e => {
          this.liked = false;
          console.log("Error to unlike: ", e.message)
        })
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/css/mixins"

.user-interactions
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
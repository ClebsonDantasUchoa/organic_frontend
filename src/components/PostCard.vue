<template>
  <div class="post-card">
    <div class="post-card__author">
      <figure class="image is-48x48">
        <img class="is-rounded" :src="post.autorImage" alt="Avatar" />
      </figure>

      <div>
        <p>{{post.autor}}</p>
        <p class="is-size-7">{{new Date(post.event_date).toUTCString()}}</p>
      </div>
    </div>

    <div class="post-card__content">
      <p>{{ post.message }}</p>
      <div class="post-card__content__image">
        <img v-bind:src="post.postImage" />
      </div>
    </div>

    <div class="post-card__interactions">
      <UserInteractions :post_id="post._id" :likes="post.likes" :comments="post.comments" />

      <!-- <button class="button is-success is-outlined">Curtir</button> -->
      <!-- <button class="button is-success" @click="setModalVisibilty">Comentar</button> -->
    </div>

    <!-- <div class="modal" :class="{'activeModal':showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button is-success" @click="setModalVisibilty">Comentar</button>
        </footer>
      </div>
    </div>-->
  </div>
</template>

<script>
import UserInteractions from "@/components/UserInteractions";

export default {
  components: {
    UserInteractions
  },

  props: {
    post: Object
  },

  data() {
    return {
      showModal: false
    };
  },
  methods: {
    setModalVisibilty() {
      this.showModal = !this.showModal;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/css/mixins"
@import "../assets/css/variables"

// .activeModal
//   display: flex

.post-card
  // width: 30px
  // margin: 15px 0px
  // display: flex
  // flex-direction: column
  // border-width: 1px
  // border-color: rgb(23, 201, 100)
  // border-radius: 7px
  // border-style: solid
  // max-width: 340px
  min-width: 100%
  padding: 10px 20px
  box-shadow: 0px 0px 5px rgba(0, 0, 0, .2)
  border-radius: 5px


  &__author
    display: flex
    align-items: center
    // margin-left: 30px
    margin-top: 10px
    border-bottom: 1px

  // &__content p
  //   text-align: justify
  //   text-indent: 20px

  &__author p
    margin-left: 10px
    color: black

  &__content
    padding: 15px 0px

    &__image
      max-height: 530px
      height: auto
      width: 100%
      // background-color: blue
      overflow: hidden
      border-radius: 5px

      img
        border-radius: 5px
        // background-color: red
        // display: block
        // min-width: 100%

  // .avatar
  //   border-radius: 50%
  //   border-width: 10px
  //   border-color: rgb(23, 201, 100)
  //   width: 45px
  //   height: 45px

  // .postImage
    // margin: 10px 0

.post-card__interactions
  // display: flex
  // align-items: flex-start
  // margin-bottom: 10px

  .icon
    cursor: pointer
    font-size: 1.5rem

// button
//   background-color: white
//   color: rgb(23, 201, 100)
//   margin-left: 10px

// @media all and (min-width: 400px)
//   .post-card
//     max-width: 500px


// @media all and (max-width: 330px)
//   .post-card
//     max-width: 290px


</style>

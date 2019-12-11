<template>
  <div class="post-card">
    <div class="post-card__author">
      <figure class="image is-48x48">
        <img
          v-if="post.author.profileImg"
          class="post-card__author__img"
          :src="post.author.profileImg"
          alt="Avatar"
        />
        <img v-else class="post-card__author__img" src="../assets/user.png" />
      </figure>

      <div>
        <p
          class="postAuthor"
          @click="redirectToAnotherProfile(post.author._id)"
        >{{post.author.name}}</p>
        <p class="is-size-7 postDate">{{convertDateInTimeAgo(new Date(post.event_date))}}</p>
      </div>
    </div>

    <div class="post-card__content">
      <p>{{ post.message }}</p>
      <div class="post-card__content__image">
        <img v-bind:src="post.postImage" />
      </div>
    </div>

    <div class="post-card__interactions">
      <UserInteractions
        :post_image="post.postImage"
        :post_id="post._id"
        :likes="post.likes"
      />
    </div>
  </div>
</template>

<script>
import UserInteractions from "@/components/UserInteractions";
import TimeAgo from "javascript-time-ago";
import pt from "javascript-time-ago/locale/pt";

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
    },

    redirectToAnotherProfile(uid) {
      this.$router.push(`/profile/${uid}`);
    },

    convertDateInTimeAgo(date) {
      TimeAgo.addLocale(pt);
      const timeAgo = new TimeAgo("pt-BR");

      return timeAgo.format(date);
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/css/mixins"
@import "../assets/css/variables"

.post-card
  min-width: 100%
  padding: 10px 20px
  box-shadow: 0px 0px 5px rgba(0, 0, 0, .2)
  border-radius: 5px

  &__author
    display: flex
    align-items: center
    margin-top: 10px
    border-bottom: 1px

    &__img
      border-radius: 100%
      height: 48px
      object-fit: cover
      width: 48px

  &__author
    p
      margin-left: 10px
      color: black
    .postAuthor
      color: $greenish-gray
      cursor: pointer

  &__content
    padding: 15px 0px

    &__image
      max-height: 530px
      height: auto
      width: 100%
      overflow: hidden
      border-radius: 5px

      img
        border-radius: 5px

.post-card__interactions
  .icon
    cursor: pointer
    font-size: 1.5rem
</style>

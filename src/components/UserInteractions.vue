<template>
  <div class="user-interactions">
    <div class="user-interactions__buttons">
      <div class="icon">
        <i class="fab fa-gratipay"></i>
      </div>
      {{likes}}
      <div class="icon">
        <i class="far fa-comment"></i>
      </div>
      {{comments.total}}
    </div>

    <div class="user-interactions__comments" v-if="comments.available.length">
      <div class="user-interactions__comments__content">
        <div class="user-interactions__comments__avatar">
          <figure class="image is-48x48">
            <img class="is-rounded" src="https://thispersondoesnotexist.com/image" />
          </figure>
        </div>

        <div class="user-interactions__comments__texts">
          <p>{{comments.available[0].author.name}}</p>
          <p>{{comments.available[0].text}}</p>
          <p class="is-size-7">{{new Date(comments.available[0].event_date).toUTCString()}}</p>
        </div>
      </div>

      <div class="user-interactions__comments__likes">
        <div class="icon">
          <i class="fab fa-gratipay"></i>
        </div>
        {{comments.available[0].likes}}
      </div>
    </div>

    <div class="user-interactions__post-input">
      <PostInput placeholder="Escreva um comentário..." @submit="publishComment" />
    </div>
  </div>
</template>

<script>
import PostInput from "@/components/PostInput";
export default {
  components: {
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
    comments: {
      type: Object,
      required: true
    }
  },

  methods: {
    publishComment(text) {
      let comment = {
        _id: "12",
        post_id: this.post_id,
        author: { name: "Michael Grubs" },
        text: text,
        event_date: new Date(),
        likes: 0
      };

      this.$store.dispatch("timeline/publishComment", comment);
    }
  }
};
</script>

<style lang="sass" scoped>
.user-interactions
  &__buttons
    padding: 10px 0
    .icon
      cursor: pointer

  &__comments
    // padding: 15px 0
    margin-bottom: 15px
    display: flex
    // background-color: red
    flex-direction: row
    justify-content: space-between
    align-items: center

    &__content
      display: flex
      flex-direction: row
      align-items: center

    &__avatar
    &__texts
      line-height: 1.2
      margin-left: 5px
    &__likes
  &__post-input
    .post-input
      box-shadow: none
      padding: 0
</style>
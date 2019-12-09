<template>
  <div class="user-interactions__comments">
    <div class="user-interactions__comments__content">
      <div class="user-interactions__comments__avatar">
        <figure class="image is-48x48">
          <img class="is-rounded" src="https://thispersondoesnotexist.com/image" />
        </figure>
      </div>

      <div class="user-interactions__comments__texts">
        <p class="commentAuthor">{{comment.author.name}}</p>
        <p>{{comment.text}}</p>
        <!-- <p class="is-size-7">{{new Date(comment.event_date).toUTCString()}}</p> -->
        <p class="is-size-7">{{new Date(comment.event_date).toUTCString()}}</p>
      </div>
    </div>

    <div class="user-interactions__comments__likes">
      <div class="icon">
        <i class="fab fa-gratipay"></i>
      </div>
      {{comment.likes}}
    </div>
  </div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },

    data() {
        return {

        }
    }
};
</script>

<style lang="sass" scoped>
@import "../assets/css/mixins"
@import "../assets/css/variables"

.user-interactions
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
      .commentAuthor
        color: $greenish-gray
    &__likes
</style>
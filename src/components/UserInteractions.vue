<template>
  <div class="user-interactions">
    <div class="user-interactions__buttons">
      <div class="icon">
        <i class="fab fa-gratipay"></i>
      </div>10
      <div class="icon">
        <i class="far fa-comment"></i>
      </div>20
    </div>

    <div class="user-interactions__comments">
      <div class="user-interactions__comments__content">
        <div class="user-interactions__comments__avatar">
          <figure class="image is-48x48">
            <img class="is-rounded" src="https://thispersondoesnotexist.com/image" />
          </figure>
        </div>

        <div class="user-interactions__comments__texts">
          <p>Josué</p>
          <p>Texto do Fulano</p>
          <p class="is-size-7">2 horas</p>
        </div>
      </div>

      <div class="user-interactions__comments__likes">
        <div class="icon">
          <i class="fab fa-gratipay"></i>
        </div>410
      </div>
    </div>

    <div class="user-interactions__post-input">
      <PostInput placeholder="Escreva um comentário..." />
    </div>
  </div>
</template>

<script>
import PostInput from "@/components/PostInput";
export default {
  components: {
    PostInput
  }
};
</script>

<style lang="sass" scoped>
.user-interactions
  &__buttons
    .icon
      cursor: pointer

  &__comments
    padding: 15px 0
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
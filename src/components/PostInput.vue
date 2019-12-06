<template>
  <div class="post-input">
    <div class="post-input__wrap">
      <div class="post-input__avatar">
        <figure class="image is-32x32">
          <img class="is-rounded" src="https://bit.ly/2YlBRrr" />
        </figure>
      </div>

      <textarea
        class="input is-success"
        type="text-area"
        :placeholder="placeholder"
        rows="5"
        cols="25"
      ></textarea>

      <div class="post-input__submit">
        <div class="icon">
          <i class="fas fa-paper-plane"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Escreva algo"
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/css/variables"
@import "../assets/css/mixins"

.post-input
  padding: 10px
  box-shadow: 0px 0px 5px rgba(0, 0, 0, .2)
  border-radius: 5px

  &__wrap
    display: flex
    flex-direction: row
    align-items: center
    background-color: #f7f7f7
    border-radius: 5px
    padding: 5px 10px

  &__avatar
    cursor: pointer

  textarea
    resize: none
    overflow: hidden
    min-height: 40px
    max-height: 100px
    border: none
    box-shadow: none
    border-radius: 5px
    background-color: transparent
    line-height: 1

    &:focus
      border: none
      box-shadow: none

  &__submit
    .icon
      cursor: pointer
      font-size: 1.2rem
</style>
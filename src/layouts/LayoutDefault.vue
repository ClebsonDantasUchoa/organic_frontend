<template>
  <div class="layout-default">
    <div class="layout-default__wrap tile is-ancestor is-vertical">
      <div class="layout-default__top-bar tile is-parent">
        <TopBar />
      </div>

      <div class="layout-default__content tile is-parent">
        <div class="layout-default__left tile is-child is-3">
          <i class="fa fa-user-circle-o"></i>
        </div>

        <!-- <div > -->
        <perfect-scrollbar
          :options="{suppressScrollX: true}"
          class="layout-default__middle tile is-child"
        >
          <router-view />
        </perfect-scrollbar>
        <!-- </div> -->

        <div class="layout-default__right tile is-child is-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "./TopBar";

export default {
  components: {
    TopBar
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/css/mixins"

.layout-default
  height: 100vh
  max-height: 100vh

  &__wrap
    margin: 0
    height: 100%

  .tile.is-parent

  &__top-bar
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .2)
    padding: 0
    max-height: fit-content

  &__content
    height: max-content
    padding: 0

  &__left, &__middle, &__right
    padding: 5px

  &__left
    border-right: solid 1px rgba(0, 0, 0, .1)

    +md
      display: none

  &__middle
    overflow-y: scroll
    // overflow-x: hidden
    height: 100vh

  &__right
    border-left: solid 1px rgba(0, 0, 0, .1)

    +md
      display: none

</style>
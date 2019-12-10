<template>
  <div class="top-bar tile is-parent">
    <div class="top-bar__figure tile is-child is-3">
      <h1 @click="pushRoute('/feed')">Organix</h1>
    </div>

    <div class="top-bar__buttons tile is-child">
      <div class="icon" :class="{'icon--active': activeIcon('/feed')}">
        <i class="fas fa-home" @click="pushRoute('/feed')"></i>
      </div>

      <div class="icon" :class="{'icon--active': activeIcon('/groups')}">
        <i class="fas fa-users" @click="pushRoute('/groups')"></i>
      </div>

      <div class="icon" :class="{'icon--active': activeIcon('/chat')}">
        <i class="fas fa-comments" @click="pushRoute('/chat')"></i>
      </div>

      <span class="icon" :class="{'icon--active': activeIcon('/store')}">
        <i class="fas fa-store" @click="pushRoute('/store')"></i>
      </span>

      <div class="icon" :class="{'icon--active': activeIcon('/notifications')}">
        <i class="fas fa-bell" @click="pushRoute('/notifications')"></i>
      </div>
    </div>

    <div class="top-bar__search tile is-child is-3">
      <div class="control has-icons-right">
        <input class="input" type="email" placeholder="Pesquisar" />
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    pushRoute(path) {
      if (this.$route.path !== path) this.$router.push(path);
    },

    activeIcon(path) {
      if (this.$route.path === path) return true;
      return false;
    }
  }
};
</script>

<style lang="sass" scoped>
@import "../assets/css/mixins"
@import "../assets/css/variables"

.top-bar
  padding: 0
  height: 60px

  +md
    padding: 15px 5px
    height: 55px

  &__figure
    padding-top: 5px
    text-align: center
    font-size: 2rem
    height: 100%

    h1
      cursor: pointer
      color: $greenish-gray

    +md
      display: none

  &__buttons
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-around

    .icon
      font-size: 2rem
      cursor: pointer
      color: $light-green

      &--active
        color: $greenish-gray

      +sm
        font-size: 1.5rem

  &__search
    padding-top: 7px
    .control
      margin: 0 auto
      width: 85%

      ::placeholder
        color: $light-green

      input
        border-color: $greenish-gray
        color: $greenish-gray

      span
        color: $light-green

    +md
      display: none
</style>
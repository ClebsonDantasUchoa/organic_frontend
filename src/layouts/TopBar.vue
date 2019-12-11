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

      <!-- <div class="icon" :class="{'icon--active': activeIcon('/chat')}">
        <i class="fas fa-comments" @click="pushRoute('/chat')"></i>
      </div>-->

      <!-- <span class="icon" :class="{'icon--active': activeIcon('/store')}">
        <i class="fas fa-store" @click="pushRoute('/store')"></i>
      </span> -->

      <div class="icon" :class="{'icon--active': activeIcon('/notifications')}">
        <i class="fas fa-bell" @click="pushRoute('/notifications')"></i>
      </div>

      <div class="icon" :class="{'icon--active': activeProfileIcon('/profile')}">
        <i class="fa fa-user-circle" @click="pushUserProfile"></i>
      </div>

      <span class="icon" :class="{'icon--active': activeIcon('/logout')}">
        <i class="fas fa-sign-out-alt" @click="logout"></i>
      </span>

    </div>

    <div class="top-bar__search tile is-child is-3">
      <div class="control has-icons-right">
        <input class="input" type="email" placeholder="Buscar usuários" />
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </div>
      <div class="top-bar__search__results">
        <div class="top-bar__search__users">
          <figure class="top-bar__search__users__avatar image is-48x48">
            <img class="is-rounded" src="https://thispersondoesnotexist.com/image" />
          </figure>
          <div class="top-bar__search__users__info">
            <p>Fulano</p>
          </div>
          <div class="top-bar__search__users__button">
            <button class="button--unfollow button is-small is-success">Desseguir</button>
          </div>
        </div>

        <div class="top-bar__search__users">
          <figure class="top-bar__search__users__avatar image is-48x48">
            <img class="is-rounded" src="https://thispersondoesnotexist.com/image" />
          </figure>
          <div class="top-bar__search__users__info">
            <p>Fulano</p>
          </div>
          <div class="top-bar__search__users__button">
            <button class="button--follow button is-small">Seguir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase';

export default {
  data() {
    return {
      uid: ""
    };
  },

  methods: {
    pushRoute(path) {
      if (this.$route.path !== path) this.$router.push(path);
    },

    pushUserProfile(path) {
      let uid = localStorage.getItem("uid");
      console.log(`/profile/${uid}`)
      if (this.$route.path !== path) this.$router.push(`/profile/${uid}`);
    },

    activeIcon(path) {
      if (this.$route.path === path) return true;
      return false;
    },

    logout(){
      firebase.auth().signOut().then(() => {
        localStorage.clear()
        this.pushRoute('/login')
      }, function(error) {
        console.log("Error to logout", error)
      });
    },

    activeProfileIcon(path) {
      if (`/${this.$route.path.split("/")[1]}` === path) return true;
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
    position: relative

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

    &__results
      width: 100%
      position: absolute

    &__users
      background-color: $whitesmoke
      padding: 5px
      display: flex
      align-items: center
      justify-content: space-between
      border-radius: 5px
      margin: 3px auto
      width: 85%
      height: 50px

      &__info
        width: 50%

        p
          cursor: pointer

      &__button

        .button
          width: 70px

        .button--follow
          background-color: $greenish-gray
          color: white

        .button--unfollow
          background-color: #fa7268

    +md
      display: none
</style>
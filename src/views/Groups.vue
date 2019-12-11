<template>
  <div class="groups">
    <h1 class="has-text-centered">Grupos</h1>
    <div v-for="(user, key) in community" :key="key" class="relationshipsInfo">
      <div class="userInfo">
        <figure class="image is-48x48">
          <img v-if="user.profileImg" class="myImg" :src="user.profileImg" alt="avatar" />
          <img v-else class="myImg" src="../assets/user.png" alt="avatar" />
        </figure>
        <p class="userName" @click="redirectToAnotherProfile(user._id)">{{user.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      community: "search/getCommunity"
    })
  },

  mounted() {
    this.$store.dispatch("search/searchCommunity");
  },

  methods: {
    redirectToAnotherProfile(uid) {
      this.$router.push(`/profile/${uid}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.relationshipsInfo {
  display: flex;
  align-items: center;
  margin: 20px 0px;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  padding-bottom: 10px;
  justify-content: space-between;

  .myImg {
    border-radius: 100%;
    height: 48px;
    object-fit: cover;
    width: 48px;
  }

  .userName {
    margin: 0;
    cursor: pointer;
  }

  .button {
    margin-left: 20px;
    margin-right: 20px;
  }

  figure {
    margin-right: 1em;
    margin-left: 0;
  }

  .figure:not(:last-child) {
    margin-bottom: 0;
  }

  .userInfo {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
}
</style>
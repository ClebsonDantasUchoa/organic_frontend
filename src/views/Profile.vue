<template>
  <div class="content" v-if="profile">
    <Modal @close="closeFollowerModal" :isActive="modalFollower">
      <div v-for="(follower, key) in followers" :key="key" class="relationshipsInfo">
        <figure class="image is-48x48">
          <img class="is-rounded" src="https://thispersondoesnotexist.com/image" />
        </figure>
        <p class="followerName">{{follower.name}}</p>
        <button class="button is-small" v-if="!follower.isFollowed">Seguir</button>
      </div>
    </Modal>

    <Modal @close="closeFollowingModal" :isActive="modalFollowing">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child">
            <div v-for="(following, key) in following" :key="key" class="relationshipsInfo">
              <figure class="image is-48x48">
                <!-- <img class="is-rounded" src="https://thispersondoesnotexist.com/image" /> -->
                <img class="is-rounded" src="../assets/user.png" />
              </figure>
              <p>{{following.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <img v-if="profile.profileImg" class="profileImg" :src="profile.profileImg" />
    <img v-else class="profileImg" src="../assets/user.png" />

    <div class="about">
      <h2 class="name">{{profile.name}}</h2>

      <div v-if="uid !== profileUid">
        <button
          v-if="!isFollowing"
          class="button--follow button is-small"
          :class="{'is-loading': loading}"
          @click="follow"
        >Seguir</button>
        <button
          v-else
          class="button--unfollow button is-small"
          :class="{'is-loading': loading}"
          @click="unfollow"
        >Desseguir</button>
      </div>

      <p class="description">{{profile.description}}</p>
    </div>

    <div class="data">
      <div class="buttons" @click="openFollowingModal">
        <p class="following">Seguindo: {{profile.following}}</p>
      </div>

      <div class="buttons" @click="openFollowerModal">
        <p class="followers">Seguidores: {{profile.followers}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import { mapGetters } from "vuex";

export default {
  components: {
    Modal
  },

  data() {
    return {
      uid: localStorage.getItem("uid"),
      profileUid: "",
      loading: false,
      modalFollower: false,
      modalFollowing: false,
      followers: [
        {
          name: "Samuel Albuquerque",
          isFollowed: true
        }
      ],
      following: [
        {
          name: "Justin"
        }
      ]
    };
  },

  methods: {
    openFollowerModal() {
      this.modalFollower = true;
    },
    closeFollowerModal() {
      this.modalFollower = false;
    },

    openFollowingModal() {
      this.modalFollowing = true;
    },
    closeFollowingModal() {
      this.modalFollowing = false;
    },

    async follow() {
      this.loading = true;
      await this.$store.dispatch("user/followSomeone", {
        user_following: this.profileUid,
        uid: this.uid
      });

      // this.loading = false;
    },

    async unfollow() {
      this.loading = true;
      await this.$store.dispatch("user/unfollowSomeone", {
        user_unfollowing: this.profileUid,
        uid: this.uid
      });

      // this.loading = false;
    },

    searchUsers() {
      this.profileUid = this.$route.path.split("/profile/")[1];
      this.$store.dispatch("search/searchUserProfile", this.profileUid);
      if (this.profileUid !== this.uid)
        this.$store.dispatch("user/findLoggedUserProfile", this.uid);
    }
  },

  watch: {
    $route() {
      this.searchUsers();
    },

    isFollowing() {
      this.loading = false;
    }
  },

  computed: {
    isFollowing() {
      if (this.loggedUser) {
        let following = this.loggedUser.userFollow.following.map(
          fw => fw.path.split("users/")[1]
        );
        return following.includes(this.profileUid);
      }
      return false;
    },

    profile() {
      if (this.uid === this.profileUid) return this.loggedUser;
      else return this.searchedUser;
    },

    ...mapGetters({
      loggedUser: "user/getLoggedUserProfile",
      searchedUser: "search/getUserProfileSearched"
    })
  },

  mounted() {
    this.searchUsers();
  }
};
</script>

<style lang="scss" scoped>
.relationshipsInfo {
  display: flex;
  align-items: center;
  margin: 20px 0px;

  .followerName {
    margin: 0;
  }

  .button {
    margin-left: 20px;
  }

  figure {
    margin-right: 1em;
    margin-left: 0;
  }

  .figure:not(:last-child) {
    margin-bottom: 0;
  }
}
.content {
  margin-top: 30px;
  max-width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.content .button--follow {
  background-color: #379683;
  color: white;
}

.content .button--unfollow {
  background-color: #fa7268;
  color: white;
}

.profileImg {
  // background-color: rgb(23, 201, 100);
  border-radius: 100%;
  height: 120px;
  object-fit: cover;
  width: 120px;
}
.about {
  text-align: center;
  border-bottom: 3px solid rgb(23, 201, 100);
}
.description {
  text-align: center;
  margin: 10px 20px;
}
.name {
  margin-top: 10px;
  font-size: 25px;
}
.data {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 3px solid rgb(23, 201, 100);
  min-width: 480px;
  max-width: 480px;
}
.buttons {
  padding: 15px 10px;
  margin: 0;
  cursor: pointer;
}
@media all and (max-width: 330px) {
  .data {
    min-width: 320px;
  }
}
</style>
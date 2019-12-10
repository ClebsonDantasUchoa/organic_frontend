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
                <img class="is-rounded" src="https://thispersondoesnotexist.com/image" />
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

      <button class="button is-small is-info">Seguir</button>
      <button class="button is-small is-danger">Desseguir</button>

      <p class="description">
        {{profile.description}}
      </p>
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
      modalFollower: false,
      modalFollowing: false,
      followers: [
        {
          name: "Samuel Albuquerque",
          isFollowed: true
        },
        {
          name: "Samuel Albuquerque ",
          isFollowed: false
        },
        {
          name: "Samuel Albuquerque",
          isFollowed: true
        },
        {
          name: "Samuel Albuquerque",
          isFollowed: false
        },
        {
          name: "Samuel Albuquerque",
          isFollowed: true
        },
        {
          name: "Samuel Albuquerque",
          isFollowed: true
        }
      ],
      following: [
        {
          name: "Justin"
        },
        {
          name: "Justin"
        },
        {
          name: "Justin"
        },
        {
          name: "Justin"
        },
        {
          name: "Justin"
        },
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
    }
  },

  computed: {
    ...mapGetters({
      profile: "search/getUserProfileSearched"
    })
  },

  mounted() {
    let uid = this.$route.path.split("/profile/")[1];
    console.log(uid);
    this.$store.dispatch("search/searchUserProfile", uid);
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
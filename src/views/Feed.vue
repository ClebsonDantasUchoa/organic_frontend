<template>
  <div class="feed">
    <div class="feed__header">
      <PostInput />
    </div>

    <div class="feed__content">
      <PostCard v-for="(post, key) in posts" :post="post" :key="key" />
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard";
import PostInput from "@/components/PostInput";

export default {
  components: {
    PostCard,
    PostInput
  },

  data() {
    return {
      posts: [
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Jucelino",
          postImage: require("../assets/1.jpg"),
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        },
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Bla",
          postImage: require("../assets/2.jpg"),
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        },
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Bla",
          postImage: require("../assets/3.jpg"),
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        },
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Bla",
          postImage: "",
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        },
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Bla",
          postImage: "",
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        },
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Bla",
          postImage: "",
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        },
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Bla",
          postImage: "",
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        },
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Bla",
          postImage: "",
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        },
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Bla",
          postImage: "",
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        },
        {
          autorImage: "https://thispersondoesnotexist.com/image",
          autor: "Bla",
          postImage: "",
          message: "HAUAHUHUAHHAUHUAUAUHAH"
        }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
.feed
  padding: 25px 15px

  .post-card
    margin-bottom: 20px

  &__header
    margin-bottom: 20px
  // background-color: #f7f7f7
</style>
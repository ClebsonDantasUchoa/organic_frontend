<template>
  <div class="post-input">
    <div class="post-input__wrap">
      <div class="post-input__avatar">
        <figure class="image is-32x32">
          <img v-if="user && user.profileImg" :src="user.profileImg" />
          <img v-else src="../assets/user.png" />
        </figure>
      </div>

      <textarea
        @keydown.enter="submit"
        @click="textAreaFocus"
        class="input is-success"
        type="text-area"
        :placeholder="placeholder"
        v-model="text"
        rows="5"
        cols="25"
      ></textarea>

      <div v-if="allowImage" class="post-input__upload-image">
        <div class="file">
          <input class="file-input" type="file" name="sheet" @change="getFile" />

          <div class="icon">
            <i class="fas fa-camera-retro"></i>
          </div>
        </div>
      </div>

      <div class="post-input__submit">
        <div class="icon" @click="submit">
          <i class="fas fa-paper-plane"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    placeholder: {
      type: String,
      default: "Escreva algo"
    },
    allowImage: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      text: "",
      image: "",
      uid: localStorage.getItem("uid")
    };
  },

  computed: {
    ...mapGetters({
      user: "user/getLoggedUserProfile"
    })
  },

  methods: {
    submit() {
      if (!this.text) return;
      if (this.allowImage) {
        this.$emit("submit", { text: this.text, image: this.image });
      } else {
        this.$emit("submit", this.text);
      }

      this.image = "";
      this.text = "";
    },

    textAreaFocus() {
      this.$emit("textAreaFocus");
    },

    getFile(ev) {
      const file = ev.target.files[0];

      let metadata = {
        contentType: file.type,
        size: file.size
      };

      const reader = new FileReader();

      reader.onload = async e => {
        this.image = {
          file: new Uint8Array(e.target.result),
          metadata: metadata
        };
      };
      reader.readAsArrayBuffer(file);
    }
  },

  mounted() {
    this.$store.dispatch("user/findLoggedUserProfile", this.uid);
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

    img
      border-radius: 100%
      height: 32px
      object-fit: cover
      width: 32px

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

  &__upload-image
    padding: 0 5px
    // .file .icon
    //   cursor: pointer
    //   // font-size: 1.2rem
</style>
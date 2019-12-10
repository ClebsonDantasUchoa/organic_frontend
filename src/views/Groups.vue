<template>
  <div class="groups">
    <h1 class="has-text-centered">Grupos</h1>
    <div v-for="(user, key) in community" :key="key">
      <p>
        {{user.name}}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data(){
    return{
    }
  },

  computed: {
    ...mapGetters({
      community: "search/getCommunity"
    })
  },

  mounted(){
    this.$store.dispatch("search/searchCommunity");
  },

  methods: {

  }
}
</script>
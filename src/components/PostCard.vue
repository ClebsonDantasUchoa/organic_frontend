<template>
  <div class="postCardContent">
    <div class="userDiv">
      <img class="avatar" v-bind:src="post.autorImage" alt />
      <p>{{post.autor}}</p>
    </div>
    <div class="postContent">
      <p>{{ post.message }}</p>
      <img class="postImage" v-bind:src="post.postImage" />
    </div>
    <div class="options">
      <button class="button is-success is-outlined">Curtir</button>
      <button class="button is-success" @click="setModalVisibilty" >Comentar</button>
    </div>

    <div class="modal" :class="{'activeModal':showModal}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button is-success" @click="setModalVisibilty" >Comentar</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
  data(){
      return {
        showModal : false
      }
  },
  methods: {
      setModalVisibilty(){
        this.showModal = !this.showModal    
      }
  }
};
</script>

<style scoped>
.activeModal{
    display: flex;
}
.postCardContent {
  width: 30px;
  margin: 15px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-color: rgb(23, 201, 100);
  border-radius: 7px;
  border-style: solid;
  max-width: 340px;
}
.userDiv {
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-top: 10px;
  border-bottom: 1px;
}
.postContent p {
  text-align: justify;
  text-indent: 20px;
}
.userDiv p {
  margin-left: 10px;
  color: black;
}
.postContent {
  margin-top: 16px;
  margin-left: 15px;
  margin-right: 15px;
}
.avatar {
  border-radius: 50%;
  border-width: 10px;
  border-color: rgb(23, 201, 100);
  width: 45px;
  height: 45px;
}
.postImage {
  margin: 10px 0;
}
.options {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}
button {
  background-color: white;
  color: rgb(23, 201, 100);
  margin-left: 10px;
}
@media all and (min-width: 400px) {
  .postCardContent {
    max-width: 500px;
  }
}
@media all and (max-width: 330px) {
  .postCardContent {
    max-width: 290px;
  }
}
</style>

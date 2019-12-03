<template>
    <div class="postCardContent">
        <div class="userDiv">
            <img class="avatar" v-bind:src="post.autorImage" alt="">
            <p>{{post.autor}}</p>
        </div>
        <div class="postContent">
            <p>{{ post.message }}</p>
            <img class="postImage" v-bind:src="post.postImage">
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        post: Object
    }
}
</script>

<style scoped>

.postCardContent{
    width: 30px;
    margin: 15px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-width: 1px;
    border-color:  rgb(23, 201, 100);
    border-radius: 7px;
    border-style: solid;
    max-width: 340px;
}
.userDiv{
    display: flex;
    align-items: center;
    margin-left: 30px;
    margin-top: 10px;
}
.postContent p{
    text-align: justify;
    text-indent: 20px
}
.userDiv p{
    margin-left: 10px;
    color: black
}
.postContent {
    margin-top: 16px;
    margin-left: 15px;
    margin-right: 15px;
}
.avatar {
  border-radius: 50%;
  border-width: 10px;
  border-color:  rgb(23, 201, 100);
  width: 45px;
  height: 45px;
}
.postImage{
    margin: 10px 0;
}
@media all and (min-width: 400px){
    .postCardContent{
        max-width: 500px;
    }
}
@media all and (max-width: 330px){
    .postCardContent{
        max-width: 290px;
    }
}
</style>

<template>
    <div class="content">
        <img src="https://i.stack.imgur.com/atUuf.png">
        <div class="about">
            <h2 class="name">Josué Nicholson</h2>
            <p class="description">
                Estudante de engenharia de software e técnico em mecânica. <br>
                Tenho 19 anos, gosto de música pop.
            </p>
        </div>
        <div class="data">
            <p class="following">
                Seguindo: 213
            </p>
            <p class="followers">
                Seguidores: 457
            </p>
        </div>
        <div class="posts">
            <PostCard v-for="post in posts" v-bind:key=post.autor v-bind:post="post" />
        </div>
    </div>
</template>

<script>
import PostCard from '@/components/PostCard'

export default {
    components: {
        PostCard
    },
    data() {
        return {
            posts:
                [
                    {
                        autor: 'Josue Nicholson',
                        message: 'Oi pessoal, estou passando aqui para avisar que temos legumes novinhos hoje !! Não esquece de passar aqui pra dar uma conferida',
                        autorImage: 'https://i.stack.imgur.com/atUuf.png',
                        postImage: 'https://ichef.bbci.co.uk/news/624/cpsprodpb/15682/production/_109328678_gettyimages-901653798.jpg'
                    },
                    {
                        autor: 'Josue Nicholson',
                        message: 'Oi pessoal, estou passando aqui para avisar que temos legumes novinhos hoje !! Não esquece de passar aqui pra dar uma conferida',
                        autorImage: 'https://i.stack.imgur.com/atUuf.png',
                    }
                ]
        }
    }
}
</script>

<style scoped>
.content{
    margin-top: 30px;
    max-width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
}
img{
  background-color: rgb(23, 201, 100);
  border-radius: 100%;
  height: 120px;
  object-fit: cover;
  width: 120px;  
}
.about{
    border-bottom: 3px solid rgb(23, 201, 100);
}
.description{
    text-align: start;
    margin: 10px 20px
}
.name{
    margin-top: 10px;
    font-size: 25px
}
.data{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 15px;
    border-bottom: 3px solid rgb(23, 201, 100);
    min-width: 480px;
    max-width: 480px;
}
@media all and (max-width: 330px){
    .data{
        min-width: 320px;
    }
}
</style>
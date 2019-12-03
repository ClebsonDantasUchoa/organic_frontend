<template>
    <div class="testContent">
        <PostCard v-for="post in posts" v-bind:key=post.autor v-bind:post="post" />
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
                        autor: 'Paulo Ribeiro',
                        message: 'Oi pessoal, estou passando aqui para avisar que temos legumes novinhos hoje !! Não esquece de passar aqui pra dar uma conferida',
                        autorImage: 'https://www.quixada.ufc.br/wp-content/uploads/2015/05/Fabio-Carlos-Sousa-Dias1.png',
                        postImage: 'https://ichef.bbci.co.uk/news/624/cpsprodpb/15682/production/_109328678_gettyimages-901653798.jpg'
                    },
                    {
                        autor: 'Paulo Ribeiro',
                        message: 'Oi pessoal, estou passando aqui para avisar que temos legumes novinhos hoje !! Não esquece de passar aqui pra dar uma conferida',
                        autorImage: 'https://www.quixada.ufc.br/wp-content/uploads/2015/05/Fabio-Carlos-Sousa-Dias1.png',
                        postImage: 'https://ichef.bbci.co.uk/news/624/cpsprodpb/15682/production/_109328678_gettyimages-901653798.jpg'
                    }
                ]
        }
    }
}
</script>

<style scoped>
.testContent{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 100vw;
}
</style>
<template>
    <div class="post-input">
        <div class="field">
            <div class="control">
                <textarea class="input is-success" type="text-area" placeholder="Escreva algo"  rows="5" cols="25">
                </textarea>
                <div class="level-left">
                    <div class="level-item">
                        <a class="button is-info">Postar</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        
    }
}
//height: 90px !important;
</script>

<style scoped>
.post-input {
    margin: 20px 0;
    border-width: 5px;
    border-color: black;
    height: 100%;
}
textarea{
    resize: none;
    width: 450px !important;
    min-height: 100%;
    max-height: 100%;
}
.control{
    display: relative;
    height: 100%;
}
.button {
    position: absolute;
    right: 0;
    border-radius: 100px;
    margin-right: -40px;
    background-color: rgb(23, 201, 100) !important;
}
@media all and (max-width: 400px){
    textarea{
        width: 270px !important;
    }
    .button{
        font-size: 15px;
        margin-right: -20px
    }
}
</style>
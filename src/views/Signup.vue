<template>
  <div class="content">
    <div class="logo">
      <header>Organic</header>
      <h5>Crie sua conta</h5>
    </div>
    <form class="form" action="#" @submit.prevent="submit">
      <div  class="alert alert-danger"></div>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input border-input"
            type="text"
            placeholder="Nome"
            v-model="form.name"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input border-input"
            type="email"
            placeholder="Email"
            v-model="form.email"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>

      <textarea
        class="input is-success description"
        type="text-area"
        placeholder="Fale um pouco sobre você"
        v-model="form.description"
        rows="5"
        cols="25"
      ></textarea>

      <div class="field">
        <p class="control has-icons-left">
          <input id="password" class="input border-input" type="password" v-model="confirmPass" placeholder="Senha" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <p class="control has-icons-left">
          <input
            id="passwordConfirmation"
            class="input border-input password-confirmation"
            type="password"
            placeholder="Confirmar senha"
            v-model="form.password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <div class="button is-success is-rounded" :class="{'is-loading': loading}" @click="submit">Registrar-se</div>
      <article class="message is-danger">
        <div v-if="error" class="message-body">{{error}}</div>
      </article>
    </form>
  </div>
</template>

<script>

import firebase from "firebase";
let db = firebase.firestore()

export default {
  data() {
    return {
      loading: false,
      form: {
        name: "",
        email: "",
        password: "",
        description: ""
      },
      confirmPass: "",
      error: null
    };
  },

  watch: {
    "form.password"() {
      if (this.form.password !== this.confirmPass)
        this.error = "As senhas precisam ser iguais!"
      else
        this.error = ""
    }
  },

  methods: {
      async submit() {
        this.loading = true
        if(this.error) return
        let uid;
        try {
          await firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(data => {
            console.log("--------USER ID----------")
            uid = data.user.uid
            console.log(uid)
            data.user.updateProfile({
                displayName: this.form.name
            })
            localStorage.setItem("uid", uid)
          })
          await this.saveUserData(uid)
          localStorage.setItem("uemail", this.form.email)
          localStorage.setItem("uname", this.form.name)
          this.$router.push("/feed");
        } catch (error) {
          this.error = error.message;
        }
        this.loading = false
      },
      async saveUserData(uid){
        await db.collection("users").doc(uid).set({
          _id: uid,
          created: new Date(),
          description: this.form.description,
          email: this.form.email,
          followers: 0,
          following: 0,
          name: this.form.name
        })
        .catch(function(error) {
          console.error("Error adding User: ", error);
        });
      }
  }
};
</script>

<style>
h5{
    margin-top: 20px
}
header{
  font-size: 25px
}
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
}
.logo {
    margin-bottom: 30px
}
.form {
  padding: 0px 40px;
  max-width: 400px;
}
.field{
    margin-bottom: 30px !important
}
.submit {
  background-color: rgb(23, 201, 100);
  color: white;
}
.border-input{
    border-color: rgb(23, 201, 100)
}
.border-input:focus{
    border-color: rgb(23, 201, 100)
}
.message{
  margin-top: 15px
}
.description{
  resize: none;
  height: 90px;
  min-height: 40px;
  max-height: 100px;
  margin-bottom: 10px
}
</style>
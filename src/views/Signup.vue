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

      <div class="field">
        <p class="control has-icons-left">
          <input id="password" class="input border-input password" type="password" placeholder="Senha" />
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

      <input class="input is-rounded submit" v-on:click="confirmPassword()" type="submit" value="Registrar-se" />
      <article class="message is-danger">
        <div v-if="error" class="message-body">{{error}}</div>
      </article>
    </form>
  </div>
</template>

<script>

import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
      confirmPassword() {
          let password = document.getElementById("password").value
          let passwordConfirmation = document.getElementById("passwordConfirmation").value
          if(password !== passwordConfirmation){
              this.error = "As senhas precisam ser iguais"    
          }
          else{
            this.error = null
          }
      },
      submit() {
        if(this.error) return
        firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).then(data => {
          data.user.updateProfile({
              name: this.form.name
          }).then(() => {});
        })
        .catch(err => {
          this.error = err.message;
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
</style>
<template>
  <div class="content">
    <div class="logo">
      <header>Organic</header>
    </div>
    <form class="form" action="#" @submit.prevent="submit">

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
          <input
            class="input border-input"
            type="password"
            placeholder="Senha"
            v-model="form.password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <article class="message is-danger">
        <div v-if="error" class="message-body">{{error}}</div>
      </article>
      <input class="input is-rounded submit" type="submit" value="Login" />
      <p>ou</p>
      <router-link to="/signup">
        <input class="input is-rounded submit" type="submit" value="Crie sua conta" />
      </router-link>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(response => {
          localStorage.setItem("uemail", response.user.email)
          this.$router.replace({ name: "feed" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};

</script>

<style>
p{
  margin-top: 15px
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
</style>
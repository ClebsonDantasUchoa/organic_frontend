<template>
  <div class="content">
    <div class="logo">
      <header>Organic</header>
      <h5>Crie sua conta</h5>
    </div>
    <div class="form">

      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input border-input" type="email" placeholder="Email" />
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
          <input id="passwordConfirmation" class="input border-input password-confirmation" type="password" placeholder="Confirmar senha" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>

      <input class="input is-rounded submit" v-on:click="confirmPassword()" type="submit" value="Registrar-se" />
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        confirmPassword() {
            let password = document.getElementById("password").value
            let passwordConfirmation = document.getElementById("passwordConfirmation").value
            if(password !== passwordConfirmation){
                alert("As senhas precisam ser iguais")    
            }
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
</style>
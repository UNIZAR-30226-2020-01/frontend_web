<template>

  <div class="container" id="form">
    <h1 class="text-center">Register</h1>
    <form class="text-left form" method="post" v-on:submit.prevent="register()">
      <label for="user">Username</label><input class="form-control" type="text" id="user" minlength="4" maxlength="10" required="" v-model="username">
      <label for="email">E-mail</label><input class="form-control" type="email" id="email" required="">
      <label for="passwd">Password</label>
      <input class="form-control" type="password" id="passwd" required="" v-model="password">
      <label for="cpasswd">Confirm Password</label>
      <input class="form-control" type="password" id="cpasswd" required="">
      <button class="btn btn-primary text-center submit-button" type="submit">Create Account</button>
    </form>
  </div>

</template>


<script>

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      register: function() {
        const url = 'https://s7-rest.francecentral.cloudapp.azure.com/register/';
        let http = this.$http;
        let username = this.username;
        let password = this.password;
        this.$http
          .post(url, {
            username: username,
            password: password
          })
          .then(function(response) {
            if (response.status == 201) {
              // Ha ido bien
              console.log('Ha ido bien');
              // Obtenemos el token
              http.post(
                'https://s7-rest.francecentral.cloudapp.azure.com/api-token-auth/?format=json',
                {
                  username: username,
                  password: password
                }
              ).then(
                function(response) {
                  if(response.status == 200){
                    localStorage.setItem('token', response.body.token);
                    this.$router.push({
                      path: '/'
                    });
                  }else{
                    console.log('Error al obtener el token ' + response.status);
                  }
                }
              );
            } else {
              console.log('Ha habido un error. Codigo de error: ' + response.status);
            }
          })
      }
    }
  }

</script>


<style>

  @import './../assets/css/styles.css';

</style>

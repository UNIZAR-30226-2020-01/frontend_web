<template>

  <!-- Codigo del login -->
  <div class="container" id="form">
    <h1 class="text-center">Log in</h1>
    <form class="text-left form"
          method="POST"
          @submit.prevent="login"><label for="user">Username</label><input class="form-control"
             type="text"
             id="user"
             minlength="4"
             maxlength="10"
             required=""
             v-model="username"><label for="passwd">Password</label><input class="form-control"
             type="password"
             id="passwd"
             required=""
             v-model="password">
      <h2 v-show="error"> Usuario o contraseña incorrectos </h2>
      <button class="btn btn-primary text-center submit-button" type="submit">Enter</button></form>
  </div>

</template>


<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: false
      }
    },
    methods: {
      login: function() {
        console.log('Intento el login')
        if (this.userAndPasswordValid) {
          // console.log();
          this.$http.post('https://s7-rest.francecentral.cloudapp.azure.com/api-token-auth/?format=json', {
              username: this.username,
              password: this.password
            })
            .then(function(response) {
              console.log(response.body);
              if (response.status == 200) {
                // TODO: Comprobacion adicional para ver si el token es valido?
                localStorage.setItem('token', response.body.token);
                this.$router.push({
                  path: '/'
                });
              } else {
                this.error = true;
              }
            });
        }
      }
    },
    computed: {
      userAndPasswordValid: function() {
        // TODO: Cambiar por una validación de verdad
        return true
      }
    },
  }

</script>


<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/bootstrap.min.css';

</style>

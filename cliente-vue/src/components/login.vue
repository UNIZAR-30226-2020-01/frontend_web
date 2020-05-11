
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
             v-model.lazy="password">
      <h2 v-show="error"> Usuario o contraseña incorrectos </h2>
      <button class="btn btn-primary text-center submit-button" type="submit">Enter</button></form>
      <!-- // Button to login with google ui rendered using the renderParams object
    // The rendered button can't be use to logout since it is rendered by the google api and will only login
    // If you add the logoutButton param to true it will show a normal button without styles -->
      <google-login :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></google-login>
      <p>¿No tienes cuenta? <router-link to="/register"> Regístrate aqui </router-link></p>
  </div>

</template>


<script>

 import GoogleLogin from 'vue-google-login';
  export default {
    components: {
      'google-login': GoogleLogin,
      // 'player-component': Player,
    },
    data() {
      return {
        username: '',
        password: '',
        error: false,
        // para auth con google (https://www.npmjs.com/package/vue-google-login):
        // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
        params: {
            client_id: "315592854144-vmlqopbbu8os9un2aksdirfktks8s81p.apps.googleusercontent.com"
        },
        // only needed if you want to render the button with the google ui
        renderParams: {
            width: 250,
            height: 50,
            longtitle: true
        },
      }
    },

    methods: {

      onSuccess(googleUser) {
          console.log(googleUser);

          console.log(googleUser.tc.access_token);
          console.log(googleUser.access_token);
          // This only gets the user information: id, name, imageUrl and email
          console.log(googleUser.getBasicProfile());


          // Login al backend con googleUser
          console.log('Intento el login con el token de Google')
          // console.log();
          this.$http.post('https://s7-rest.francecentral.cloudapp.azure.com/auth/convert-token/', {
              grant_type: 'convert_token',
              client_id: 'rPllY8pG9tdFdROaiX7ZwIsCdQ4xzwhskdW1oCaH',
              client_secret: 'GSBMVcRbAjz6C3l2QbfNhXs0jIF3uvBXGqNTdJ27d0fhuGeAJg4YoTMaqOeMS9HqDJtk9Kd8yar8ZVMZOOG5PZJKaRPQwvMnhnp7R1H3TixGA1ZYWPigRUUx2uOv9FkW',
              backend: 'google-oauth2',
              token: googleUser.tc.access_token,
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
                console.log('Hay un error. Codigo de error: ' + response.status);
                this.error = true;
              }
            });
      },
      onFailure() {
        console.log("fallo de auth con Google");
      },
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
                console.log('Hay un error. Codigo de error: ' + response.status);
                this.error = true;
              }
            },
            function(response){
              // On error
              console.log('Hay un error. Codigo de error: ' + response.status);
              this.error = true;
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

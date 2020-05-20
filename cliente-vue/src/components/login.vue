
<template>
  <div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="jumbotron"><img id="logo" src="../assets/img/logo_circular.png">
                <h1 class="text-center">Welcome to SpotiSeven</h1>
                <p class="text-center">SpotiSeven is a free opensource player that gives you all your favorite music. No payments, no publicity abuse and no limits.</p>
                <p class="text-center"><a class="btn btn-primary text-dark" role="button">Learn more</a></p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 text-center">
            <h1>Aye you using a mobile phone? Download our app</h1><button class="btn btn-primary" id="boton_download" type="button"><strong>Download</strong></button>
        </div>
    </div>
  <!-- Codigo del login -->
      <div class="row">
          <div class="col-md-12">
            <div class="jumbotron" id="jumbo-login">
            <h1 class="text-center">Log in</h1>
            <div class="container" id="caja-login">
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
                <h3 v-show="error"> Usuario o contraseña incorrectos </h3>
                <!-- // Button to login with google ui rendered using the renderParams object
              // The rendered button can't be use to logout since it is rendered by the google api and will only login
              // If you add the logoutButton param to true it will show a normal button without styles -->
                <google-login :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></google-login>
                <button class="btn btn-primary text-center submit-button" type="submit">Enter</button></form>

            </div>
            <p>¿No tienes cuenta? <router-link to="/register"> Regístrate aqui </router-link></p>
            </div>
      </div>
    </div>
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
            width: 480,
            longtitle: true,
            height: 50,
        },
      }
    },

    methods: {

      onSuccess(googleUser) {
          console.log(googleUser);

          console.log(googleUser.tc.access_token);

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
                console.log(response.body.access_token)
                // En este caso en vez de "Token [el token]", la cadena sera "Bearer [el token]"
                localStorage.setItem('token', response.body.access_token);
                localStorage.setItem('refresh_token', response.body.refresh_token);
                localStorage.setItem('type', response.body.token_type);
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
                localStorage.setItem('type', 'Token');
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

  @import './../assets/css/Inicio.css';
  /*@import './../assets/css/styles.css';*/
  /*@import './../assets/css/bootstrap.min.css';*/

  #jumbo-login{
    display:block;
    color:white;
  }

  #caja-login{
    display:block;
    position: relative;
    left:27%;
  }

  .btn-primary:hover {background-color: #FFD800}
  .btn.btn-primary {
    color: black;
    margin: 10px;
    border-style: none;
    border-radius: 15px;
    background-color: #FFD300;
    border-color: transparent;
  }

  .button:focus{
    color: #FFD300;
    background-color: #FFD300;
    border-color: #FFD300;
    box-shadow: 0 0 0 .2rem rgba(255,211,0,0.5);
  }
  /*
  .btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show > .btn-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 .2rem rgba(255,211,0,0.5);
  }*/

  .btn-primary.focus, .btn-primary.btn-block:focus {
    color: #FFD300;
    background-color: #FFD300;
    border-color: #FFD300;
    box-shadow: 0 0 0 .2rem rgba(255,211,0,0.5);
  }
  .btn-group {
    display: block;
  }
  .btn-primary:hover {background-color: #FFD300}

  .btn-primary.btn-block:active {
    background-color: #FFD300;
    box-shadow: 0 5px #FFD300;
    transform: translateY(4px);
  }

  .btn.btn-primary.submit-button {
    margin-left: 56%;
    margin-top: 20px;
    min-width: 44%;
  }

  .text-left.form {
    max-width: 500px;
  }

</style>

<template>
<!-- Codigo del login -->
  <div>

  </div>
</template>


<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: false
    };
  },
  methods: {
    login: function() {
      if(this.userAndPasswordValid){
        this.$http.post('https://s7-rest.francecentral.cloudapp.azure.com/api-token-auth/',
      {
          username: this.username,
          password: this.password
      }
    ).then(
          function(response) {
            if(response.status == 200){
              // TODO: Comprobacion adicional para ver si el token es valido?
              localStorage.setData('token', response.body.token);
              this.$router.push({
                path: '/'
              });
            }else{
              this.error = true;
            }
          }
        );
      }
    }
  },
  computed: {
    userAndPasswordValid: function() {
      // TODO: Cambiar por una validación de verdad
      return true;
    }
  }
}
</script>


<style>

</style>

export default {
  computed: {
    getAllPodcasts: function() {
      // Esto es un mixin que utilizara un objeto Vue asi que podemos usar
      // peticiones HTTP con el atributo $http
      this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/podcasts/', {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(
        function(response){
          //console.log(response);
          if(response.status == 200){
            // Todo ok
            this.podcasts = response.body;
            this.podcasts.forEach((podcast) => {
              var list = podcast.url.split('/');
              console.log(list);
              podcast.id = list[list.length - 2];
              podcast.url.replace('http://', 'https://');
            });
            console.log(this.podcast);
          }
        },
        function(response){
          console.log("error al obtener todos los podcast. Codigo de error: " + response.status);
          console.log(response);
        }
      );
    },
  getUserPodcasts: function() {
    // Esto es un mixin que utilizara un objeto Vue asi que podemos usar
    // peticiones HTTP con el atributo $http
    console.log("Peticion de los podcast del usuario")
    this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/user/podcasts/', {
      headers: {
        Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
      }
    }).then(
      function(response){
        console.log("Ha funcionado?")
        console.log(response);
        if(response.status == 200){
          // Todo ok
          this.podcasts = response.body;
          this.podcasts.forEach((podcast) => {
            var list = podcast.url.split('/');
            console.log(list);
            podcast.id = list[list.length - 2];
            podcast.url.replace('http://', 'https://');
          });
          console.log(this.podcast);
        }
      },
      function(response){
        console.log("error al obtener todos los podcast del usuario. Codigo de error: " + response.status);
        console.log(response);
      }
    );
  }
}
}

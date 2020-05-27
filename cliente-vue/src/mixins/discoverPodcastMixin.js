export default {
  computed: {
    getAllGenresPodcasts: function() {
      // Esto es un mixin que utilizara un objeto Vue asi que podemos usar
      // peticiones HTTP con el atributo $http
      this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/genres/?ordering=-number_podcasts&limit=8&offset=0', {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(
        function(response){
          if(response.status == 200){
            // Todo ok
            this.genres = response.body.results;
            this.genres.forEach((podcast) => {
              var list = podcast.url.split('/');
              console.log(list);
              podcast.id = list[list.length - 2];
              podcast.url.replace('http://', 'https://');
            });
            console.log(this.genres);
          }
        }
      );
    }
  }
}

export default {
  computed: {
    getAllTrendingPodcasts: function() {
      // Esto es un mixin que utilizara un objeto Vue asi que podemos usar
      // peticiones HTTP con el atributo $http
      this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/trending-podcast/', {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(
        function(response){
          if(response.status == 200){
            // Todo ok
            this.trending_podcasts = response.body;
            this.trending_podcasts.forEach((podcast) => {
              var list = podcast.url.split('/');
              console.log(list);
              podcast.id = list[list.length - 2];
              podcast.url.replace('http://', 'https://');
            });
            console.log(this.podcast);
          }
        }
      );
    }
  }
}
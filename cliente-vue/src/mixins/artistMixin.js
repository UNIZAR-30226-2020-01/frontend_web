export default {
  computed: {
    getAllArtists: function() {
      // Esto es un mixin que utilizara un objeto Vue asi que podemos usar
      // peticiones HTTP con el atributo $http
      this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/artists/?format=json', {
        headers: {
              Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(
        function(response){
          if(response.status == 200){
            // Todo ok
            this.artists = response.body;
            this.artists.forEach((artist) => {
              var list = artist.url.split('/');
              console.log(list);
              artist.id = list[list.length - 2];
              artist.url.replace('http://', 'https://');
            });
            console.log(this.artists);
          }
        }
      );
    }
  }
}

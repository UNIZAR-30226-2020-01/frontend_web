export default {
  computed: {
    getAllAlbums: function() {
      // Esto es un mixin que utilizara un objeto Vue asi que podemos usar
      // peticiones HTTP con el atributo $http
      this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/albums/?format=json').then(
        function(response){
          if(response.status == 200){
            // Todo ok
            this.albums = response.body;
            this.albums.forEach((album) => {
              var list = album.url.split('/');
              console.log(list);
              album.id = list[list.length - 2];
              album.url.replace('http://', 'https://');
            });
            console.log(this.albums);
          }
        }
      );
    }
  }
}

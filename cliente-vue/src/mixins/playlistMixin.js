export default {
  computed: {
    getAllPlaylists: function() {
      // Esto es un mixin que utilizara un objeto Vue asi que podemos usar
      // peticiones HTTP con el atributo $http
      this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/user/playlists/', {
        headers: {
          Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
        }
      }).then(
        function(response){
          console.log(response);
          if(response.status == 200){
            // Todo ok
            this.playlists = response.body;
            this.playlists.forEach((playlist) => {
              var list = playlist.url.split('/');
              console.log(list);
              playlist.id = list[list.length - 2];
              playlist.url = playlist.url.toString().replace('http://', 'https://');
              // Para cada cancion del playlist
            });
          }
        }
      );
    }
  }
}

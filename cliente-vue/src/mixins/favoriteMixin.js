export default {
  methods: {
    setFavorite: function(song, value) {
      console.log("Marcando como... " + value);
      if(value){
        // Marcamos como favorito
        this.$http.get(song.url + 'set_favorite/', {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
          }
        }).then(
          function(response) {
            if(response.status ==  200){
              // Ha ido bien
              song.is_fav = value;
            }else{
              // Ha habido un error
              console.log('Ha ido mal al marcar como favorito');
            }
          }
        );
      }else{
        // Desmarcamos como favorito
        this.$http.get(song.url + 'remove_favorite/', {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
          }
        }).then(
          function(response) {
            if(response.status ==  200){
              // Ha ido bien
              song.is_fav = value;
            }else{
              // Ha habido un error
              console.log('Ha ido mal al desmarcar como favorito');
            }
          }
        );
      }
    }
  }
}
export default {
    methods: {
        addToPlaylist: function(song, playlist) {
            this.$http.post(playlist.url + 'add_song/?song=' + song.url,{
                headers: {
                    Authorization: 'Token ' + localStorage.getItem('token'),
                }
            }
            ).then(
                function(response) {
                    // Tratamiento de la respuesta
                    if(response.status != 200){
                        console.log('Error en introducción de ' + song.title + ' en la playlist ' + playlist.title);
                    }
                }
            );
        }
    }
}
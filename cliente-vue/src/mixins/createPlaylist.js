export default {
    methods: {
        createPlaylist: function(title, image) {
            // Creamos el objeto FormData para enviar la foto elegida al cliente
            let fd = new FormData();
            fd.append('title', title);
            fd.append('icon', image);
            // Realizamos la peticion
            this.$http.post('https://s7-rest.francecentral.cloudapp.azure.com/playlists/', fd, {
                headers: {
                    Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
                }
            }
            ).then(
                function(response) {
                    // Tratamiento de la respuesta
                    if(response.status != 200){
                        console.log('Error en la creacion de la playlist: ' + title);
                    }
                }
            );
        }
    }
}

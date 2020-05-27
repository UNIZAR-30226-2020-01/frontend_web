export default {
    methods: {
        changeUserImage: function(image) {
            let fd = new FormData();
            fd.append('icon', image);

            this.$http.put('https://s7-rest.francecentral.cloudapp.azure.com/update-user/', fd, {
                headers: {
                    Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
                }
            }).then(
                function(response) {
                    if(response.status == 200){
                        // Ha ido bien
                        console.log("Se ha modificado la imagen del usuario");
                        this.$router.go();
                        // Esto nos devuelve el usuario
                        console.log(response.status);
                    }
                }
            );
        }
    }
}

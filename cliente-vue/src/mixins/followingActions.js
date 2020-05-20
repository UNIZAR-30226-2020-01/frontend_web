export default {
    methods: {
        followUser: function(user){
            this.$http.get(user.url + 'follow/', {
                headers: {
                    Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
                }
            }).then(
                function(response) {
                    if(response.status == 200){
                        // Ha ido bien. Se está siguiendo al usuario <user>
                        console.log("Se ha empezado a seguir al usuario " + user.username);
                    }else{
                        // Error
                        console.log("Se ha producido un error al seguir al usuario " + user.username + ". Codigo de error: " + response.status);
                    }
                }
            );
        },
        unfollowUser: function(user) {
            this.$http.get(user.url + 'unfollow/', {
                headers: {
                    Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
                }
            }).then(
                function(response) {
                    if(response.status == 200){
                        // Ha ido bien. Se está siguiendo al usuario <user>
                        console.log("Se ha dejado de seguir al usuario " + user.username);
                    }else{
                        // Error
                        console.log("Se ha producido un error al dejar de seguir al usuario " + user.username + ". Codigo de error: " + response.status);
                    }
                }
            );
        },
        getFollowingPlaylists: function(){
            this.$http.get('http://s7-rest.francecentral.cloudapp.azure.com/user/followed/playlists/', {
                headers: {
                    Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
                }
            }).then(
                function(response) {
                    if(response.status == 200){
                        // Ha ido bien. Devolvemos la lista de playlist de los usuarios a los que seguimos
                        return response.body;
                    }else{
                        // Ha habido un error
                        console.log("Ha habido un error al recuperar las playlist de los seguidos. Codigo de error: " + response.status);
                    }
                }
            );
        }
    }
}
export default {
    methods: {
        followUser: function (user) {
            this.$http.get(user.url + 'follow/', {
                headers: {
                    Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
                }
            }).then(
                function (response) {
                    if (response.status == 200) {
                        // Ha ido bien. Se está siguiendo al usuario <user>
                        console.log("Se ha empezado a seguir al usuario " + user.username);
                    } else {
                        // Error
                        console.log("Se ha producido un error al seguir al usuario " + user.username + ". Codigo de error: " + response.status);
                    }
                }
            );
        },
        unfollowUser: function (user) {
            this.$http.get(user.url + 'unfollow/', {
                headers: {
                    Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
                }
            }).then(
                function (response) {
                    if (response.status == 200) {
                        // Ha ido bien. Se está siguiendo al usuario <user>
                        console.log("Se ha dejado de seguir al usuario " + user.username);
                    } else {
                        // Error
                        console.log("Se ha producido un error al dejar de seguir al usuario " + user.username + ". Codigo de error: " + response.status);
                    }
                }
            );
        },
    },
    computed:{
      getFollowingPlaylists: function () {
          this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/user/followed/playlists/', {
              headers: {
                  Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
              }
          }).then(
              function (response) {
                  if (response.status == 200) {
                      // Ha ido bien. Devolvemos la lista de playlist de los usuarios a los que seguimos
                      this.playlistFollowed = response.body;
                      this.playlistFollowed.forEach((podcast) => {
                        var list = podcast.url.split('/');
                        console.log(list);
                        podcast.id = list[list.length - 2];
                        podcast.url.replace('http://', 'https://');
                      });
                  } else {
                      // Ha habido un error
                      console.log("Ha habido un error al recuperar las playlist de los seguidos. Codigo de error: " + response.status);
                  }
              }
          );
      },
      getFollowingUsers: function () {
          this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/current-user/', {
              headers: {
                  Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
              }
          }).then(
              function (response) {
                  if (response.status == 200) {
                      // Ha ido bien, devolvemos la lista de usuarios a los que seguimos
                      return response.body[0].following;
                  } else {
                      // Ha habido un error
                      console.log("Ha habido un error al recuperar los usuarios seguidos. Codigo de error: " + response.status);
                  }
              }
          );
      },
      getFollowerUsers: function () {
          this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/current-user/', {
              headers: {
                  Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
              }
          }).then(
              function (response) {
                  if (response.status == 200) {
                      // Ha ido bien, devolvemos la lista de usuarios a los que seguimos
                      return response.body[0].followers;
                  } else {
                      // Ha habido un error
                      console.log("Ha habido un error al recuperar los usuarios seguidores. Codigo de error: " + response.status);
                  }
              }
          );
      }
    }
}

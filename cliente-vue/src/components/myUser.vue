<template>
  <div class="col">
    <div id="content">
      <div class="container albumfondo" id="content-container" :key="this.key">
        <div class="row">
          <div class="col-lg-4 columna-album1">
            <div class="myimg__wrap">
              <img class="myimg__img" :src="user.icon" />
              <p class="myimg__description">Change profile picture</p>
              <h6 class="divimagealbum">{{ user.username }}</h6>
            </div>
            <div>
              <p
                style="text-align: center;"
                class="number-songs"
                @click="
                  showFollowers = false;
                  showFollowing = !showFollowing;
                "
              >
                Following: {{ user.following.length }}
              </p>
              <p
                style="text-align: center;"
                class="number-songs"
                @click="
                  showFollowing = false;
                  showFollowers = !showFollowers;
                "
              >
                Followers: {{ user.followers.length }}
              </p>
              <div
                @click="
                  () => {
                    $router.go();
                  }
                "
              >

              </div>
              <p v-if="checkIfFollowers">Te sigue</p>
              <p v-if="showFollowers">Followers</p>
              <p v-if="showFollowing">Following</p>
              <!-- <p class="day-release">Since: Day release: {{playlist.date}}</p> -->
              <div v-if="this.showFollowers" class="container-fluid">
                <ul class="list-inline text-center">
                  <li
                    class="list-inline-item artist-item"
                    @click="
                      () => {
                        $router.go();
                      }
                    "
                    v-for="us in user.followers"
                    :key="us.username"
                  >
                    <router-link v-bind:to="'/user/' + us.id">
                      <div class="card text-center p-2 artist-card">
                        <header class="card-header">
                          <h3
                            class="card-title artist-name"
                            style="font-size: 90%"
                          >
                            {{ us.username }}
                          </h3>
                          <h6 class="card-subtitle">User</h6>
                        </header>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
              <div v-if="this.showFollowing" class="container-fluid">
                <ul class="list-inline text-center">
                  <li
                    class="list-inline-item artist-item"
                    @click="
                      () => {
                        $router.go();
                      }
                    "
                    v-for="us in user.following"
                    :key="us.username"
                  >
                    <router-link v-bind:to="'/user/' + us.id">
                      <div class="card text-center p-2 artist-card">
                        <header class="card-header">
                          <h3
                            class="card-title artist-name"
                            style="font-size: 90%"
                          >
                            {{ us.username }}
                          </h3>
                          <h6 class="card-subtitle">User</h6>
                        </header>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="jumbotron">
              <h1>Playlists</h1>
            </div>
            <ul class="list-inline text-center">
              <!-- TODO: Cambiar esto. es para pruebas -->
              <li
                class="list-inline-item artist-item"
                v-for="playlist in user.playlists"
                :key="playlist.name"
              >
                <router-link v-bind:to="'/playlists/' + playlist.id">
                  <div class="card text-center p-2 artist-card">
                    <header class="card-header">
                      <h3 class="card-title artist-name" style="font-size: 90%">
                        {{ playlist.title }}
                      </h3>
                      <h6 class="card-subtitle">Playlist</h6>
                    </header>
                    <div class="card-body">
                      <img
                        id="artist-pic"
                        class="m-auto mx-auto d-block"
                        v-bind:src="playlist.icon"
                      />
                      <p
                        id="artist-songs"
                        class="card-text artist-songs d-inline"
                      >
                        {{ playlist.number_songs }} songs
                      </p>
                      <!-- <p class="card-text artist-albums d-inline">&nbsp;{{artist.number_albums}} albums</p> -->
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import followingMixin from "../mixins/followingActions";
export default {
  data() {
    return {
      key: 0,
      user: {},
      followingCurrentUser: [],
      followersCurrentUser: [],
      showFollowing: false,
      showFollowers: false,
    };
  },
  mixins: [followingMixin],
  methods: {
    refresh: function() {
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      this.$router.go();
    },
  },
  created() {
    // Llamada para traer los datos del artista
    console.log("creating");
    // this.updateKey();
    this.$http
      .get("https://s7-rest.francecentral.cloudapp.azure.com/current-user/", {
        headers: {
          Authorization:
            localStorage.getItem("type") + " " + localStorage.getItem("token"),
        },
      })
      .then(function(response) {
        if (response.status == 200) {
          // Ha ido bien, devolvemos la lista de usuarios a los que seguimos
          this.followersCurrentUser = response.body[0].followers;
          this.followingCurrentUser = response.body[0].following;
          var url = "https://s7-rest.francecentral.cloudapp.azure.com/s7_user/";
          let id = response.body[0].url.split('/')[response.body[0].url.split('/').length - 2];
          this.$http
            .get(url + id, {
              headers: {
                Authorization:
                  localStorage.getItem("type") +
                  " " +
                  localStorage.getItem("token"),
              },
            })
            .then(function(response) {
              if (response.status == 200) {
                console.log(response.body);
                this.user = response.body;
                this.user.url = this.user.url.replace("http://", "https://");
                console.log(
                  "url -----" + this.user.url.replace("http://", "https://")
                );
                this.user.playlists.forEach((playlist) => {
                  var list = playlist.url.split("/");
                  console.log(list);
                  playlist.id = list[list.length - 2];
                  playlist.url.replace("http://", "https://");
                });
                this.user.followers.forEach((us) => {
                  var list = us.url.split("/");
                  console.log(list);
                  us.id = list[list.length - 2];
                  us.url.replace("http://", "https://");
                });
                this.user.following.forEach((us) => {
                  var list = us.url.split("/");
                  console.log(list);
                  us.id = list[list.length - 2];
                  us.url.replace("http://", "https://");
                });
              }
            });
        } else {
          // Ha habido un error
          console.log(
            "Ha habido un error al recuperar los usuarios seguidos. Codigo de error: " +
              response.status
          );
        }
      });
    this.$http
      .get("https://s7-rest.francecentral.cloudapp.azure.com/current-user/", {
        headers: {
          Authorization:
            localStorage.getItem("type") + " " + localStorage.getItem("token"),
        },
      })
      .then(function(response) {
        if (response.status == 200) {
          // Ha ido bien, devolvemos la lista de usuarios a los que seguimos
        } else {
          // Ha habido un error
          console.log(
            "Ha habido un error al recuperar los usuarios seguidores. Codigo de error: " +
              response.status
          );
        }
      });
  },
  computed: {
    checkIfFollowing: function() {
      var check = false;
      var tr = false;
      this.followingCurrentUser.forEach((us) => {
        check = us.username == this.user.username;
        console.log(check);
        if (check === true) {
          tr = true;
        }
      });
      console.log(tr);
      return tr;
    },
    checkIfFollowers: function() {
      var check = false;
      var tr = false;
      this.followersCurrentUser.forEach((us) => {
        check = us.username == this.user.username;
        if (check) {
          tr = true;
        }
      });
      console.log(tr);
      return tr;
    },
  },
};
</script>

<style>
@import "./../assets/css/album_Indv.css";

.myimg__img {
  height: 200px;
  width: 200px;
}

.myimg__wrap {
  position: relative;
}

.myimg__description {
  position: relative;
  background-color: black;
  color: #fff;
  visibility: hidden;
  opacity: 0;
  text-align: center;
  width: 150px;
  border-radius: 25px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* transition effect. not necessary */
  transition: opacity 0.2s, visibility 0.2s;
  cursor: pointer;
}

.myimg__wrap:hover .img__description {
  visibility: visible;
  opacity: 1;
}

.myimg__wrap:hover .img__img {
  opacity: 0.3;
}

.myimg__wrap:hover .middle {
  opacity: 1;
}
</style>

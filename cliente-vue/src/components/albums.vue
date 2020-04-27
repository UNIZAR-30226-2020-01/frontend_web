<template>
<!--
  <div id="content">
    <div class="container" id="content-container">
      <div class="artists">
        <ul class="list-inline-item text-center">
          <li class="d-table-row album-item" v-for="album in albums" :key="album.title">
            <router-link v-bind:to="'/albums/' + album.id ">
            <div class="album-div">
              <img class="album-pic" alt="album_pic" v-bind:src="album.icon">
                <div id="x">
                  <h6 class="album-name" style="color: white">{{ album.title }}</h6>
                  <h6 class="album-artist">{{ album.artist.name }}</h6>
                </div>
            </div>
          </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
-->

<!-- <li class="list-inline-item artist-item" v-for="artist in artists" :key="artist.name">
  <router-link v-bind:to="'/artists/' + artist.id ">
  <div class="card text-center p-2 artist-card" >
    <header class="card-header">
      <h3 class="card-title artist-name" style="font-size: 16px">{{artist.name}}</h3>
      <h6 class="card-subtitle">Artist</h6>
    </header>
    <div class="card-body"><img id="artist-pic" class="m-auto mx-auto d-block" v-bind:src="artist.image">
      <p id="artist-songs" class="card-text artist-songs d-inline">{{artist.number_songs}} songs</p>
      <p class="card-text artist-albums d-inline">&nbsp;{{artist.number_albums}} albums</p>
    </div>
  </div>
</router-link>
</li> -->

  <div class="col">
    <div class="container-fluid">
        <ul class="list-inline text-center">
          <li class="list-inline-item album-item" v-for="album in albums" :key="album.title">
            <router-link v-bind:to="'/albums/' + album.id ">
            <div class="card text-center p-2 album-card">
              <header class="card-header">
                <h3 class="card-title" style="font-size: 90%" >{{album.title}}</h3>
                <h6 class="card-subtitle">Album</h6>
              </header>
              <div class="card-body"><img id="album-pic" class="m-auto mx-auto d-block" v-bind:src="album.icon">
                <p id="card-text album-songs d-inline" style="font-size: 16px" >{{ album.artist.name }}</p>
              </div>
            </div>
          </router-link>
          </li>
        </ul>
    </div>
</div>


</template>

<script>
  import albumMixin from '../mixins/albumMixin';

  export default {
    data() {
      return {
        albums: []
      };
    },
    mixins: [albumMixin],
    created(){
      this.getAllAlbums;
    },
    methods: {
      getId: function(album) {
        let list = album.url.split('/')
        console.log(list)
        let id = list[list.length - 1]
        return id
      }
    }
  }

</script>

<style>
  @import './../assets/css/styles.css';
  @import './../assets/css/albums.css';
</style>

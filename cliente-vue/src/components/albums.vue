<template>

  <div class="col">
    <div class="container-fluid">
        <ul class="list-inline text-center">
          <li class="list-inline-item album-item" v-for="album in albums" :key="album.title">
            <router-link v-bind:to="'/albums/' + album.id ">
            <div class="card text-center p-2 album-card" style="background-color:#101010">
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

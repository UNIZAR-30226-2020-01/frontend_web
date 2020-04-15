<template>

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

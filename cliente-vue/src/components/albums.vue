<template>

  <div id="content">
    <div class="container" id="content-container">
      <div class="artists">
        <ul class="list-unstyled text-center">
          <li class="d-table-row album-item">
            <div class="album-div" v-for="album in albums" :key="album.title">
              <img class="album-pic" alt="album_pic" v-bind:src="album.icon">
                <div id="x">
                  <h2 class="album-name">{{ album.title }}</h2>
                  <h6 class="album-artist">{{ album.artist.name }}</h6>
                </div>
            </div>
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
    }
  }

</script>

<style>
  @import './../assets/css/styles.css';
  @import './../assets/css/albums.css';
</style>

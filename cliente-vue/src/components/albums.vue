<template>

  <div class="col">
    <div class="container-fluid">
        <ul class="list-inline text-center">
          <li data-aos="fade-up" class="list-inline-item album-item" v-for="album in albums" :key="album.title">
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
        <button @click="getMoreAlbums" class="btn btn-primary white"><i class="fas fa-chevron-circle-down" style="font-size: 22px;"></i></button>
    </div>
</div>

</template>

<script>
  import albumMixin from '../mixins/albumMixin';

  export default {
    data() {
      return {
        albums: [],
        indexArt: 1
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
      },
      getMoreAlbums: function(){
        this.indexArt += 8
        this.$http.get('https://s7-rest.francecentral.cloudapp.azure.com/albums/?limit=8&offset=' + this.indexArt, {
          headers: {
              Authorization: localStorage.getItem('type') + ' ' + localStorage.getItem('token'),
          }
        }).then(
          function(response){
            if(response.status == 200){
              // Todo ok
              var moreAlbums = response.body.results
              moreAlbums.forEach((alb) => {
                var list = alb.url.split('/');
                console.log(list);
                alb.id = list[list.length - 2];
                console.log(alb.id);
                alb.url.replace('http://', 'https://');
                this.albums.push(alb);
              });
              console.log(this.albums);
            }
          }
        );
      }
    }
  }

</script>

<style>
  @import './../assets/css/styles.css';
  @import './../assets/css/albums.css';
</style>

<template>

  <div>
    <div class="row">
      <div class="col-2" id="sidebar">
        <ul class="list-unstyled">
          <li>Home</li>
          <li>Search</li>
          <li>Your library
            <div>
              <div class="dropdown"><button class="btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="podcasts-dd" type="button">Podcasts</button>
                <div class="dropdown-menu"
                     role="menu"><a class="dropdown-item"
                     role="presentation"
                     href="#">First Item</a><a class="dropdown-item"
                     role="presentation"
                     href="#">Second Item</a><a class="dropdown-item"
                     role="presentation"
                     href="#">Third Item</a></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- Codigo de los artistas (de momento) -->
      <router-view/>
    </div>
  </div>

</template>

<script>

  // import Artists from './artists'
  export default {
    // components: {
    //   'artists-component': Artists
    // },
    data() {
      return {}
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/sidebar.css';

</style>

<template>

  <nav class="navbar navbar-dark navbar-expand-md fixed-top bg-dark">
    <div class="container-fluid"><router-link class="navbar-brand"
         to="/">Logo</router-link><button data-toggle="collapse"
              class="navbar-toggler"
              data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navcol-1">
        <ul class="nav navbar-nav mx-auto">
          <li class="nav-item" role="presentation">
            <router-link class="nav-link" to="/">Following</router-link>
          </li>
          <li class="nav-item" role="presentation">
            <router-link class="nav-link" to="/artists">Artists</router-link>
          </li>
          <li class="nav-item" role="presentation">
            <router-link class="nav-link" to="/">Genres</router-link>
          </li>
          <li class="nav-item" role="presentation">
            <router-link class="nav-link" to="/albums">Albums</router-link>
          </li>
          <li class="nav-item" role="presentation">
            <router-link class="nav-link" to="/">Discover</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
  import './../assets/js/bootstrap.min';
  export default {
    data() {
      return {}
    }
  }

</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/navbar.css';
  @import './../assets/css/bootstrap.min.css';

</style>

<template>
  <div id="sidebar">
        <ul class="list-unstyled">
            <li>Home</li>
            <li>Search</li>
            <li>Your library</li>
        </ul>
        <div class="dropdown" id="podcast-dropdown"><button class="btn btn-outline-primary btn-block dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="podcasts_drop" type="button">Podcasts</button>
            <div class="dropdown-menu" role="menu"><a class="dropdown-item" role="presentation" href="#">First Item</a><a class="dropdown-item" role="presentation" href="#">Second Item</a><a class="dropdown-item" role="presentation" href="#">Third Item</a></div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return {};
  }
}
</script>

<style>
  @import './../assets/css/styles.css';
  @import './../assets/css/sidebar.css';
</style>

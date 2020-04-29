<template>
  <div>
      <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <div class="jumbotron"><img id="logo" src="assets/img/logo.png">
                      <h1 class="text-center">Welcome to SpotiSeven</h1>
                      <p class="text-center">SpotiSeven is a free opensource player that gives you all your favorite music. No payments, no publicity abuse and no limits.</p>
                      <p class="text-center"><a class="btn btn-primary text-dark" role="button">Learn more</a></p>
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12 text-center">
                  <h1>Aye you using a mobile phone? Download our app</h1><button class="btn btn-primary" id="boton_download" type="button"><strong>Download</strong></button></div>
          </div>
      </div>
  <div class="login-dark">
      <form class="text-left" method="post">
          <h1 class="text-center" id="Login_text">Login</h1><img id="logo_login" src="assets/img/logo.png">
          <h2 class="sr-only">Login Form</h2>
          <div class="form-group"><input class="form-control" type="email" name="email" placeholder="Email"></div>
          <div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password"></div>
          <div class="form-group"><button class="btn btn-primary btn-block" type="submit">Log In</button></div><a class="forgot" href="#">Forgot your email or password?</a></form>
  </div>
  <div class="footer-dark">
      <footer>
          <div class="container">
              <div class="row">
                  <div class="col-sm-6 col-md-3 item">
                      <h3>Services</h3>
                      <ul>
                          <li><a href="#">Web Player</a></li>
                          <li><a href="#">Development</a></li>
                          <li><a href="#">Hosting</a></li>
                      </ul>
                  </div>
                  <div class="col-sm-6 col-md-3 item">
                      <h3>About</h3>
                      <ul>
                          <li><a href="#">SpotySeven is a&nbsp;</a></li>
                          <li><a href="#">Team</a></li>
                          <li><a href="#">Careers</a></li>
                      </ul>
                  </div>
                  <div class="col-md-6 item text">
                      <h3>SpotySeven</h3>
                      <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                  </div>
                  <div class="col item social"><a href="#"><i class="icon ion-social-facebook"></i></a><a href="#"><i class="icon ion-social-twitter"></i></a><a href="#"><i class="icon ion-social-snapchat"></i></a><a href="#"><i class="icon ion-social-instagram"></i></a></div>
              </div>
              <p class="copyright">SpotySeven Â© 2020</p>
          </div>
      </footer>
  </div>
</div>
</template>

<script>
export default {
  props: {
    // loop: Boolean,
    // shuffle: Boolean,
    // progress: Number,
    value: Object,
  },
  data() {
    return {
      volume: 0.5,
      muted: false,
      playing: false
    }
  }}
</script>

<style>

  @import './../assets/css/styles.css';
  @import './../assets/css/bootstrap.min.css';
  @import './../assets/css/Footer-Dark.css';
  @import './../assets/css/Login-Form-Dark.css';
  @import './../assets/css/Login.css';

</style>

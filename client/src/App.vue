<template>
  <div id="app">
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <img src="./assets/logo.png" alt="Hours" style="height: 28px;">
            <b>Hours</b>
          </a>
        </div>
        <div class="nav-right">
          <div class="nav-item" v-if="$pouch.loading.entries">
            <span class="icon"><i class="fa fa-refresh"></i></span>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  @media screen and (max-width: 999px) {
    .nav > .container {
      width: 100%;
    }
  }
</style>

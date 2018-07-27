<template>
  <div id="app">
    <a href="http://www.kampiapina.com/blogi/" target="_blank"><img class="logo" src="/logo.png"></a>
    <a href="http://www.kampiapina.com/blogi/nordkapp-espoo/" target="_blank" class="info-button">About the ride (fi)</a>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/list">List</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.logo {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  /*width: 40vw;
  max-width: 16rem;*/
  height: 3rem;
  z-index: 1000;
}
.info-button {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 1000;
  background: #ce1a2b;
  color: white;
  text-transform: uppercase;
  font-size: 0.6rem;
  line-height: 1.2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  text-decoration: none;
  box-shadow: 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.2);
  font-weight: 700;
}
</style>

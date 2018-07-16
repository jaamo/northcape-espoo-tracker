import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCarousel from 'vue-carousel';

Vue.config.productionTip = false

Vue.use(VueCarousel);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDolE8B2nkbeAtH1VegG06GhnR2gNu1O0M',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  }, 
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

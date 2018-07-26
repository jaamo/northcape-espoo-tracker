<template>
  <div class="about">

    <br><br><br><br>

    <h1>Location</h1>

    Lat:<br>
    <input :value=lat ref="lat" ><br>
    <button v-on:click=copyLat>Copy</button><br><br>

    Lon:<br>
    <input :value=lon ref="lon" ><br>
    <button v-on:click=copyLon>Copy</button><br>

  </div>
</template>


<script>

export default {
    
    name: 'Location',

    data() {
        return {
            lat: 0,
            lon: 0
        }
    },

    methods: {
        copyLat() {
            this.$refs.lat.select();
            document.execCommand('copy');            
        },
        copyLon() {
            this.$refs.lon.select();
            document.execCommand('copy');            
        }
    },
  
    mounted() {

        navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
        }, (error) => {
            alert("Error");
        });

    }

}

</script>
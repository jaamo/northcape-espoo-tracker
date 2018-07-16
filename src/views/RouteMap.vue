<template>
  <div class="map">

    <GmapMap
    :center="mapDefaultPosition"
    :zoom="7"
    :options="options"
    map-type-id="roadmap"
    style="width: 100vw; height: 50vh"
    ref="mapRef"
    >
        <GmapMarker
            :key="index"
            v-for="(m, index) in items"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="selectItem(m.sys.id)"
        />
    </GmapMap>

    <div class="popup">

        <carousel :perPage=1 :paginationPadding=4 paginationColor="#999999" paginationActiveColor="#ce1a2b">
            <slide>
                <div v-if="item">
                    {{ item.fields.title }}
                    {{ item.createdAtTime }}
                    {{ item.createdAtDate }}
                    {{ item.dailyDistance }}
                    {{ item.totalDistance }}
                </div>
            </slide>
            <slide>
                <div v-if="item">
                    {{ item.fields.story }}
                </div>
            </slide>
            <slide>
                <div v-if="item.img">
                    <img :src=item.img >
                </div>
            </slide>
        </carousel>

        <button class="btn btn--left">Edellinen</button>
        <button class="btn btn--right">Seuraava</button>

    </div>

  </div>
</template>

<script>
//    :center="{ lat: 60.1648608, lng: 24.9005515 }"
import { mapState, mapActions } from 'vuex'
import { mapStyle } from '../mapStyle.js'
import { GPXParser } from '../lib/gpxview.js'

// Google maps library in use:
// https://www.npmjs.com/package/vue2-google-maps

// GPX mapping library:
// https://github.com/peplin/gpxviewer

//
// Load GPX file and add points to map.
//
function loadGPXFileIntoGoogleMap(map, filename) {
    
    fetch(filename).then(response => {

        response.text().then(function (data) {

            const domParser = new DOMParser();
            const xmlData = domParser.parseFromString(data, 'text/xml');

            let parser = new GPXParser(xmlData, map);
            parser.setTrackColour("#ce1a2b");     // Set the track line colour
            parser.setTrackWidth(5);              // Set the track line width
            parser.setMinTrackPointDelta(0.001);  // Set the minimum distance between track points
            // parser.centerAndZoom(data);
            parser.addTrackpointsToMap();         // Add the trackpoints
            parser.addRoutepointsToMap();         // Add the routepoints
            parser.addWaypointsToMap();           // Add the waypoints

        });

    }, error => {});

}

export default {
    
    name: 'RouteMap',

    data() {
        return { 
            options: { 
                styles: mapStyle,
                zoomControl: true, 
                mapTypeControl: false, 
                scaleControl: true, 
                streetViewControl: false, 
                rotateControl: false, 
                fullscreenControl: false
            }
        }
    },
    
    computed: mapState({

        items: state => state.items,
        item: state => state.item,
        mapDefaultPosition: state => state.mapDefaultPosition

    }),
  
    methods: {
        ...mapActions([
            'loadItems'
        ]),
        selectItem(id) {
            this.$store.dispatch('selectItem', id)
        }
    },

    mounted() {

        // Load items. 
        this.loadItems();

        // Load GPX route to the map.
        this.$refs.mapRef.$mapPromise.then((map) => {
            loadGPXFileIntoGoogleMap(map, 'gpx/northcape-espoo.gpx');
        });

    }

}

</script>

<style>
.popup {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50vh;
    background: rgba(255,255,255,0.8);
    padding: 0rem;
    box-shadow: 0 0 6rem rgba(0,0,0,0.4);
}
.VueCarousel-wrapper {
    height: calc(50vh - 6rem);
}
.btn {
    position: absolute;
    bottom: 0;
    width: 50%;
    background: #ce1a2b;
    line-height: 3rem;
    text-align: center;
    border: 0;
    color: white;
    font-size: 1rem;
    font-weight: 700;
}
.btn--left {
    left: 0;
}
.btn--right {
    right: 0;
}
</style>

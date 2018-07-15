<template>
  <div class="map">

    <GmapMap
    :center="{lat:60.1648608, lng:24.9005515}"
    :zoom="10"
    :options={styles:styles}
    map-type-id="terrain"
    style="width: 500px; height: 300px"
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
        Popup:
        <div v-if="item">
            {{ item.fields.title }}
        </div>
    </div>

  </div>
</template>

<script>
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
            parser.setTrackColour("#ff0000");     // Set the track line colour
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
      return { styles: mapStyle }
    },
    
    computed: mapState({
        items: state => state.items,
        item: state => state.item
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
        this.loadItems();

        this.$refs.mapRef.$mapPromise.then((map) => {
            loadGPXFileIntoGoogleMap(map, 'gpx/route01.gpx');
        });
    }

}

</script>

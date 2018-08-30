import Vue from 'vue'
import Vuex from 'vuex'

var contentful = require('contentful')

Vue.use(Vuex)

// Initiate Contentful client
let contentfulClient = contentful.createClient({
	space: '0a2nb45htigq',
	accessToken: '8c1427bfac0ac93c068739e62603e9cee369034a06467a7a52c7b8615129a18b'
})

export default new Vuex.Store({


	state: {
		items: [],
		item: false,
		mapDefaultPosition: { lat: 60.1648608, lng: 24.9005515 }
	},


	//
	// Mutations
	//
	mutations: {

		//
		// Set loaded items to store
		//
		setItems(state, payload) {
			state.items = payload.items;
			state.mapDefaultPosition = payload.items[payload.items.length - 1].position;
			state.item = payload.items[payload.items.length - 1];
		},

		//
		// Set selected single item
		//
		setItem(state, payload) {
			state.item = payload.item
			state.mapDefaultPosition = payload.item.position;
		},

		//
		// Set total distance.
		//
		setTotalDistance(state, payload) {
			state.totalDistance = payload.totalDistance
		}


	},


	//
	// Actions
	//
	actions: {

		//
		// Load items from Contentful and do some post processing.
		//
		loadItems(context) {

			contentfulClient.getEntries().then(function (entries) {

				let items = entries.items;

				// Add lat & lng parameters to that the array can 
				// be directly used as Google Maps markers
				items.forEach(function (entry) {
					entry.position = {
						lat: entry.fields.location.lat,
						lng: entry.fields.location.lon
					}
				});

				// Sort list by date in ascending order.
				items.sort((a, b) => (new Date(a.sys.createdAt)).getTime() > (new Date(b.sys.createdAt)).getTime());

				items.forEach((item, i) => {					

					// Find previous & next.
					item.previous = typeof(items[i-1]) != 'undefined' ? items[i-1].sys.id : false;
					item.next = typeof(items[i+1]) != 'undefined' ? items[i+1].sys.id : false;

					// Format date
					let createdAt = new Date(item.sys.createdAt);
					item.createdAtTime = createdAt.getHours() + ':' + createdAt.getMinutes()
					item.createdAtDate = createdAt.getDate() + '.' + (createdAt.getMonth() + 1) + '.' + createdAt.getFullYear();

					// Create shortcut for image.
					if (typeof(item.fields.photo) != 'undefined') {
						item.img = item.fields.photo[0].fields.file.url;
					}

				});


				// Calculate total distance.
				let totalDistance = 0;
				let previousDistance = 0;
				let dailyDistance = 0;
				items.forEach((item) => {

					let distance = parseFloat(item.fields.dailyDistance);


					// New distance is lower than previous. New day!
					if (distance < previousDistance) {

						// Reset daily distance.
						totalDistance += previousDistance;

					}

					previousDistance = distance;

					item.dailyDistance = Math.round(parseFloat(item.fields.dailyDistance));
					item.totalDistance = Math.round(totalDistance + distance);

				});

				let rows = [];
				items.forEach((item) => {
					rows.push([item.fields.title, item.fields.dailyDistance, item.dailyDistance, item.totalDistance]);
				});
				console.table(rows);

				context.commit('setTotalDistance', { totalDistance: totalDistance });

				// Set to store.
				context.commit('setItems', { items: items });

			});

		},

		// 
		// Select an item with given id.
		//
		selectItem(context, id) {


			const items = this.state.items.filter((item) => {
				return item.sys.id == id;
			});

			if (items.length > 0) {
				this.commit('setItem', { item: items[0] });
			}

		},


	}


})

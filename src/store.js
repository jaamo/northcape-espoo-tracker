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
		item: false
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
		},

		//
		// Set selected single item
		//
		setItem(state, payload) {
			state.item = payload.item
		}

	},


	//
	// Actions
	//
	actions: {

		//
		// Load items from Contentful.
		//
		loadItems(context) {

			contentfulClient.getEntries().then(function (entries) {

				console.log(entries);
				entries.items.forEach(function (entry) {
					entry.position = {
						lat: entry.fields.location.lat,
						lng: entry.fields.location.lon
					}
				});
				context.commit('setItems', { items: entries.items });

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
				console.log(items[0]);
				this.commit('setItem', { item: items[0] });
			}

		}

	}


})

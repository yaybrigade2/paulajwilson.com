import { defineStore } from 'pinia';

export const useDataStore = defineStore('datastore', () => {

	// Fetch URL prefix
	const fetchURLprefix = 'https://paulawilsondata.yaybrigade.xyz/wp-json/paulawilsondata/v1/';

	// Search
	const searchResults = ref([]);

	// Page 
	const page = ref([]);

	// Site Options 
	const siteOptions = ref({});

	// ANCHOR Fetch search
	const fetchSearch = async (searchTerm) => {
		// console.log('fetchSearch', searchTerm);	
		if (typeof searchResults.value[searchTerm] === 'undefined' || searchResults.value[searchTerm].data === null) {

			// initialize object
			searchResults.value[searchTerm] = {
				data: null,
				isLoading: true,
				errorLoading: false,
				noData: false
			};
			
			// Get remote data
			try {
				const { data } = await useFetch(
					fetchURLprefix + 'search/' + searchTerm
				);
				// console.log(data.value);

				searchResults.value[searchTerm].isLoading = false

				if (data.value === null) {
					searchResults.value[searchTerm].errorLoading = true
				} else {
					searchResults.value[searchTerm].data = data.value // Save data to store
					
					if (! data.value || (Array.isArray(data.value) && data.value.length === 0)) {
						searchResults.value[searchTerm].noData = true
					}
				}
				 //console.log(searchResults.value[searchTerm]);


			} catch (error) {
				console.error('Error fetching search:', error);
				searchResults.value[searchTerm].errorLoading = true
			}
		}
	}	

	// ANCHOR Fetch page
	const fetchPage = async (id) => {

		if (!id) {
			id = 'paula-wilson' // slug for home page  // TODO: verify this is correct 
		}

		if (typeof page.value[id] === 'undefined' || page.value[id].data === null) {
		
			// initialize object
			page.value[id] = {
				data: null,
				isLoading: true,
				errorLoading: false,
				noData: false
			};

			// Get remote data
			try {
				const { data } = await useFetch(
					fetchURLprefix + 'page/' + id
				);
				// console.log(fetchURLprefix + 'page/' + id);
				// console.log(data);

				page.value[id].isLoading = false

				if (data.value === null) {
					page.value[id].errorLoading = true
				} else {
					page.value[id].data = data.value // Save data to store
					
					if (! data.value) {
						page.value[id].noData = true
					}
				}
			} catch (error) {
				console.error('Error fetching page:', error);
				page.value[id].errorLoading = true
			}
		}
	}	

	// ANCHOR Fetch site options
	const fetchSiteOptions = async () => {
		if (typeof siteOptions.value.data === 'undefined' || siteOptions.value.data === null) {

			// initialize object
			siteOptions.value = {
				data: null,
				isLoading: true,
				errorLoading: false,
				noData: false
			};
			
			// Get remote data
			try {
				const { data } = await useFetch(
					fetchURLprefix + 'options'
				);
				// console.log(data.value);

				siteOptions.value.isLoading = false

				if (data.value === null) {
					siteOptions.value.errorLoading = true
				} else {
					siteOptions.value.data = data.value // Save data to store
					
					if (! data.value) {
						siteOptions.value.noData = true
					}
				}

			} catch (error) {
				console.error('Error fetching options:', error);
				siteOptions.value.errorLoading = true
			}
		}
	}	


	return {
		
		searchResults,
		fetchSearch,

		page,
		fetchPage,

		siteOptions: siteOptions,
		fetchSiteOptions,
		
	};
});

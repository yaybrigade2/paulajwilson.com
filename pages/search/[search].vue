<script setup>
	import { useDataStore } from '~/stores/dataStore';
	
	// Get route
	const { params } = useRoute()
	const search = ref(params.search)

	// Get Data
	const dataStore = useDataStore();

	if (import.meta.client) {
		dataStore.fetchSearch(search.value)
	} else {
		await dataStore.fetchSearch(search.value)
	}	

	const searchResults = computed(() => dataStore.searchResults[search.value].data);
	const isLoading = computed(() => dataStore.searchResults[search.value].isLoading)
	const errorLoading = computed(() => dataStore.searchResults[search.value].errorLoading)
	const noData = computed(() => dataStore.searchResults[search.value].noData)

	// Set SEO
	useSeoMeta({
		title: 'Search for: ' + search.value + ' | Site Title',
		// ogTitle: 'Search: ' + search.value + ' | Site Title',
		// ogImage: '/images/og-image.png',		
		// twitterCard: 'summary',
	})
</script>

<template>
	
	<ul v-if="searchResults && searchResults.length > 0">
		<li v-for="result in searchResults" :key="result.id" 
			class="search-results__item"
		>
			<div class="search-results__heading-wrapper">
				<NuxtLink :to="'/' + result.path">
					<h2 class="search-results__heading"
						v-html="result.title"></h2>
				</NuxtLink>
				<div class="search-results__section"
					v-if="result.section && result.section!='Page'">{{ result.section }}</div>
			</div>
			<div class="search-results__excerpt" 
				v-if="result.excerpt" v-html="result.excerpt"></div>
		</li>
	</ul>
	<div v-if="isLoading">Loading...</div>
	<div v-if="errorLoading">Error Loading. <a :href="currentPageURL">Retry</a></div>
	<div v-if="noData">No results.</div>
</template>
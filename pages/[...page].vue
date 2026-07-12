<script setup>
	// Template for Generic Page and 404 Page

	import { useDataStore } from '~/stores/dataStore';
	
	// Get route
	const { params } = useRoute()
	const slug = ref(params.page)

	// check if slug is array
	if (Array.isArray(slug.value)) {
		slug.value = slug.value[0]; // Only get the first page of the path (we're not using nested paths)
	}

	// Get Data
	const dataStore = useDataStore();

	if (import.meta.client) {
		dataStore.fetchPage(slug.value)
	} else {
		await dataStore.fetchPage(slug.value)
	}

	const page = computed(() => dataStore.page[slug.value].data);
	const isLoading = computed(() => dataStore.page[slug.value].isLoading)
	const errorLoading = computed(() => dataStore.page[slug.value].errorLoading)
	const noData = computed(() => dataStore.page[slug.value].noData)

	// Set SEO
	/*
	const seoTitle = computed(() => {
		if (page.value) {
			return page.value.title + ' | Site Title'
		}
		return 'Site Title';
	})
	useSeoMeta({
		title: seoTitle,
		ogTitle: seoTitle,
		ogImage: '/images/og-image.png',		
		twitterCard: 'summary',
	})
		*/

</script>


<template>
	<template v-if="page">
		<!-- Generic Page -->

		<h1>{{ page.title }}</h1>

		<ContentModules 
			v-if="page.contentModules?.content_modules"
			:content="page.contentModules.content_modules" 
		/>

	</template>
	<div v-if="isLoading">Loading...</div>
	<div v-if="errorLoading">Error Loading. <a :href="currentPageURL">Retry</a></div>
	<div v-if="noData">
		<!-- 404 -->
		<h1 class="heading">This page could not be found</h1>
		<div class="body-text-typography">
			<p>Sorry about that. Try going to the <NuxtLink to="/">homepage</NuxtLink>.</p>
		</div>
	</div>
</template>
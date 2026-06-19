<script setup>
import { useDataStore } from '~/stores/dataStore';


// ****
// ANCHOR onMounted()
onMounted(() => {
})


// ****
// ANCHOR doSearch 
const doSearch = () => {

	// unfocus search field using ref
	nextTick(() => {
		searchInput.value.blur();
	})

	if (searchTerm.value) {
		navigateTo({ 
			path: '/search/' + searchTerm.value,
		})
	}
}


// ****
// ANCHOR toggleSearch 
const toggleSearch = () => {
	showSearch.value = !showSearch.value;

	if (showSearch.value) {
		// focus search input
		nextTick(() => {
			searchInput.value.focus();  // searchInput is a ref on the input element in the template
		})
	}
}

</script>

<style lang="scss">
@use "~/assets/scss/reset.scss";
@use "~/assets/scss/variables.scss";
@use "~/assets/scss/global.scss";
</style>
<template>
	<div class="page">
		<header class="site-header">

		</header>

		<main class="site-main">
			<!-- <NuxtRouteAnnouncer /> -->
			<NuxtPage />
		</main>

		<footer class="site-footer">

		</footer>

	</div>
</template>
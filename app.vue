<script setup>
import { useDataStore } from '~/stores/dataStore';

const route = useRoute();

// ****
// ANCHOR Page Variables
const showNav = ref(false);
const searchOpen = ref(false);
let routeChangeClassTimer;


// ****
// ANCHOR hide nav on route change
watch(() => route.path, () => {
	showNav.value = false;
	searchOpen.value = false;

	if (import.meta.client) {
		document.body.classList.add('route-change-in-progress');

		if (routeChangeClassTimer) {
			clearTimeout(routeChangeClassTimer);
		}

		routeChangeClassTimer = setTimeout(() => {
			document.body.classList.remove('route-change-in-progress');
			routeChangeClassTimer = null;
		}, 1000);
	}
});

onBeforeUnmount(() => {
	if (routeChangeClassTimer) {
		clearTimeout(routeChangeClassTimer);
		routeChangeClassTimer = null;
	}

	if (import.meta.client) {
		document.body.classList.remove('route-change');
	}
});


// ****
// ANCHOR add page class to body for page-specific styling
const bodyPageClass = computed(() => {
	if (route.path === "/") return "page-home";

	return (
		"page-secondary  page-" +
		route.path
			.replace(/^\/|\/$/g, "")
			.replace(/\//g, "-")
			.replace(/[^a-zA-Z0-9_-]/g, "")
	);
});

useHead(() => ({
	bodyAttrs: {
		class: bodyPageClass.value,
	},
}));


</script>

<style lang="scss">
@use "~/assets/scss/reset.scss";
@use "~/assets/scss/variables.scss";
@use "~/assets/scss/global.scss";
</style>
<template>
	<div class="page-wrapper">
		<header class="site-header">

			<div class="site-nav"
				:class="{ 'site-nav--nav-open': showNav }"
			>
				<span class="site-nav__logo-name  site-nav__logo-name--paula">
					<NuxtLink to="/" tabindex="-1">
						Paula
					</NuxtLink>
				</span>
				<div class="site-nav-toggle">
					<button class="site-nav-toggle__button"
						@click="showNav = !showNav"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.5932 23.258L12.5822 23.26L12.5112 23.295L12.4912 23.299L12.4772 23.295L12.4062 23.26C12.3955 23.2567 12.3875 23.2583 12.3822 23.265L12.3782 23.275L12.3612 23.703L12.3662 23.723L12.3762 23.736L12.4802 23.81L12.4952 23.814L12.5072 23.81L12.6112 23.736L12.6232 23.72L12.6272 23.703L12.6102 23.276C12.6075 23.2653 12.6018 23.2593 12.5932 23.258ZM12.8582 23.145L12.8452 23.147L12.6602 23.24L12.6502 23.25L12.6472 23.261L12.6652 23.691L12.6702 23.703L12.6782 23.71L12.8792 23.803C12.8918 23.8063 12.9015 23.8037 12.9082 23.795L12.9122 23.781L12.8782 23.167C12.8748 23.155 12.8682 23.1477 12.8582 23.145ZM12.1432 23.147C12.1388 23.1443 12.1335 23.1435 12.1285 23.1446C12.1234 23.1457 12.119 23.1487 12.1162 23.153L12.1102 23.167L12.0762 23.781C12.0768 23.793 12.0825 23.801 12.0932 23.805L12.1082 23.803L12.3092 23.71L12.3192 23.702L12.3232 23.691L12.3402 23.261L12.3372 23.249L12.3272 23.239L12.1432 23.147Z" fill="currentColor"/>
							<path d="M20 17.5C20.3852 17.5002 20.7556 17.6486 21.0344 17.9144C21.3132 18.1802 21.479 18.5431 21.4975 18.9279C21.516 19.3127 21.3858 19.6898 21.1338 19.9812C20.8818 20.2726 20.5274 20.4558 20.144 20.493L20 20.5H4C3.61478 20.4998 3.24441 20.3514 2.96561 20.0856C2.68682 19.8198 2.52099 19.4569 2.50248 19.0721C2.48396 18.6873 2.61419 18.3102 2.86618 18.0188C3.11816 17.7274 3.47258 17.5442 3.856 17.507L4 17.5H20ZM20 10.5C20.3978 10.5 20.7794 10.658 21.0607 10.9393C21.342 11.2206 21.5 11.6022 21.5 12C21.5 12.3978 21.342 12.7794 21.0607 13.0607C20.7794 13.342 20.3978 13.5 20 13.5H4C3.60218 13.5 3.22064 13.342 2.93934 13.0607C2.65804 12.7794 2.5 12.3978 2.5 12C2.5 11.6022 2.65804 11.2206 2.93934 10.9393C3.22064 10.658 3.60218 10.5 4 10.5H20ZM20 3.5C20.3978 3.5 20.7794 3.65804 21.0607 3.93934C21.342 4.22064 21.5 4.60218 21.5 5C21.5 5.39782 21.342 5.77936 21.0607 6.06066C20.7794 6.34196 20.3978 6.5 20 6.5H4C3.60218 6.5 3.22064 6.34196 2.93934 6.06066C2.65804 5.77936 2.5 5.39782 2.5 5C2.5 4.60218 2.65804 4.22064 2.93934 3.93934C3.22064 3.65804 3.60218 3.5 4 3.5H20Z" fill="currentColor"/>
						</svg>
					</button>
				</div>
				<nav class="site-nav__nav">
					<div class="site-nav__inner">
						<Navigation v-model:search-open="searchOpen" />
					</div>
				</nav>
				<div class="site-search"
					:class="{ 'site-search--open': searchOpen }"
				>
					<Search v-model:search-open="searchOpen" />
				</div>
				<span class="site-nav__logo-name  site-nav__logo-name--wilson">
					<NuxtLink to="/">
						Wilson
					</NuxtLink>					
				</span>
			</div>

		</header>

		<main class="site-main">
			<!-- <NuxtRouteAnnouncer /> -->
			<NuxtPage />
		</main>

		<footer class="site-footer">

		</footer>

	</div>
</template>
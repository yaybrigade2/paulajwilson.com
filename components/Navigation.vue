<script setup>
const props = defineProps({
	searchOpen: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['update:searchOpen']);

const route = useRoute();

const artOpen = ref(false);
const paulasWorldOpen = ref(false);

const pagesWithSubmenus = {
	art: [
		"art",
		"exhibitions",
		"paintings",
		"sculptures",
		"films",
		"editions",
	],
	current: ["current"],
	paulasWorld: [
		"paulas-world",
		"carrizozo",
		"bio",
		"momazozo",
		"the-book",
		"cv",
		"contact",
	],
}

function isActive(path) {
	const normalizedPath = route.path.replace(/^\//, "").replace(/\/$/, "");
	return (pagesWithSubmenus[path] || []).includes(normalizedPath);
}

// watch for route changes to close submenus
watch(() => route.path, () => {
	console.log('route changed, closing submenus');
	artOpen.value = false;
	paulasWorldOpen.value = false;
});

// watch each submenu to close the other when one is opened
watch(artOpen, (newVal) => {
	if (newVal) {
		paulasWorldOpen.value = false;
	}
});
watch(paulasWorldOpen, (newVal) => {
	if (newVal) {
		artOpen.value = false;
	}
});

</script>

<template>
	<div class="site-nav__main-list">
		<ul>
			<li>
				<NuxtLink to="/art" custom v-slot="{ href }">
					<a
						:href="href"
						class="site-nav__main-link"
						:class="{ 
							'site-nav__main-link--active': artOpen || isActive('art'),
						}"
						:aria-expanded="String(artOpen)"
						aria-controls="nav-sub-art"
						@click.prevent="artOpen = !artOpen"
					>Art</a>
				</NuxtLink>

				<ul
					id="nav-sub-art"
					class="site-nav__sub-list"
					:class="{ 'site-nav__sub-list--open': artOpen }"
					:aria-hidden="String(!artOpen)"
				>
					<li>
						<NuxtLink to="/art" class="site-nav__sub-link">Introduction</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/exhibitions" class="site-nav__sub-link">Exhibitions</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/paintings" class="site-nav__sub-link">Paintings</NuxtLink>
					</li>
					<li >
						<NuxtLink to="/sculptures" class="site-nav__sub-link">Sculptures</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/films" class="site-nav__sub-link">Films</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/editions" class="site-nav__sub-link">Editions</NuxtLink>
					</li>
				</ul>
			</li>
			<li>
				<NuxtLink to="/current" class="site-nav__main-link"
					:class="{ 'site-nav__main-link--active': isActive('current') }"
				>Current</NuxtLink>
			</li>
			<li>
				<NuxtLink to="/paulas-world" custom v-slot="{ href }">
					<a
						:href="href"
						class="site-nav__main-link"
						:class="{ 'site-nav__main-link--active': paulasWorldOpen || isActive('paulasWorld') }"
						:aria-expanded="String(paulasWorldOpen)"
						aria-controls="nav-sub-paulas-world"
						@click.prevent="paulasWorldOpen = !paulasWorldOpen"
					>Paula's World</a>
				</NuxtLink>

				<ul
					id="nav-sub-paulas-world"
					class="site-nav__sub-list"
					:class="{ 'site-nav__sub-list--open': paulasWorldOpen }"
					:aria-hidden="String(!paulasWorldOpen)"
				>
					<li>
						<NuxtLink to="/paulas-world" class="site-nav__sub-link">Introduction</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/carrizozo" class="site-nav__sub-link">Carrizozo</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/bio" class="site-nav__sub-link">Bio</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/momazozo" class="site-nav__sub-link">MoMAZoZo</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/the-book" class="site-nav__sub-link">The Book</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/cv" class="site-nav__sub-link">CV</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/contact" class="site-nav__sub-link">Contact</NuxtLink>
					</li>
				</ul>
			</li>
			<li>
				<button class="site-nav__main-link  site-nav__main-link--search"
					:class="{ 'site-nav__main-link--active': isActive('search') || props.searchOpen }"
					@click="emit('update:searchOpen', !props.searchOpen)"
				>
					<span class="screen-reader-text">Search</span>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13.643 13.67L16.723 16.75M15.75 8.25C15.75 10.2391 14.9598 12.1468 13.5533 13.5533C12.1468 14.9598 10.2391 15.75 8.25 15.75C6.26088 15.75 4.35322 14.9598 2.9467 13.5533C1.54018 12.1468 0.75 10.2391 0.75 8.25C0.75 6.26088 1.54018 4.35322 2.9467 2.9467C4.35322 1.54018 6.26088 0.75 8.25 0.75C10.2391 0.75 12.1468 1.54018 13.5533 2.9467C14.9598 4.35322 15.75 6.26088 15.75 8.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</li>
		</ul>
	</div>
</template>
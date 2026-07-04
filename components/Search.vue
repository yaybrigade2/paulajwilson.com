<script setup>
const props = defineProps({
	searchOpen: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['update:searchOpen']);

const searchTerm = ref("");
const searchInput = ref(null);

watch(() => props.searchOpen, async (isOpen) => {
	if (!isOpen) {
		return;
	}

	await nextTick();
	searchInput.value?.focus();
}, { immediate: true });

const doSearch = () => {
	nextTick(() => {
		searchInput.value?.blur();
	});

	if (searchTerm.value) {
		navigateTo({
			path: '/search/' + searchTerm.value,
		});
		emit('update:searchOpen', false);
	}
};
</script>

<template>
	<div class="site-search__inner">
		<button type="button" aria-label="Close search"	class="site-search__close"
			@click="emit('update:searchOpen', false)"
		>
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM6.62305 5.87988C6.54125 5.87989 6.46034 5.89643 6.38477 5.92773C6.3092 5.95904 6.24046 6.00467 6.18262 6.0625C6.12479 6.12033 6.07917 6.1891 6.04785 6.26465C6.01656 6.34019 6.00002 6.42116 6 6.50293C6 6.5847 6.01658 6.66566 6.04785 6.74121C6.07914 6.81675 6.12482 6.88552 6.18262 6.94336L9.23828 10L6.18262 13.0566C6.12482 13.1145 6.07914 13.1833 6.04785 13.2588C6.01659 13.3343 6 13.4153 6 13.4971C6.00003 13.5788 6.01656 13.6598 6.04785 13.7354C6.07917 13.8109 6.1248 13.8797 6.18262 13.9375C6.24046 13.9953 6.3092 14.041 6.38477 14.0723C6.46034 14.1036 6.54125 14.1201 6.62305 14.1201C6.70483 14.1201 6.78576 14.1035 6.86133 14.0723C6.93687 14.041 7.00564 13.9953 7.06348 13.9375L10.1201 10.8809L13.1758 13.9375C13.2336 13.9954 13.3033 14.041 13.3789 14.0723C13.4544 14.1035 13.5355 14.1201 13.6172 14.1201C13.6989 14.1201 13.78 14.1035 13.8555 14.0723C13.931 14.041 13.9998 13.9953 14.0576 13.9375C14.1154 13.8797 14.1611 13.8109 14.1924 13.7354C14.2237 13.6598 14.2402 13.5788 14.2402 13.4971C14.2402 13.4153 14.2236 13.3343 14.1924 13.2588C14.1611 13.1833 14.1154 13.1145 14.0576 13.0566L11.001 10L14.0576 6.94336C14.2949 6.70583 14.295 6.30578 14.0576 6.06836C13.9999 6.01051 13.931 5.96493 13.8555 5.93359C13.78 5.90227 13.6989 5.88578 13.6172 5.88574C13.5353 5.88574 13.4535 5.90223 13.3779 5.93359C13.3025 5.96495 13.2335 6.01053 13.1758 6.06836L10.1201 9.11914L7.06348 6.0625C7.00564 6.0047 6.93687 5.95903 6.86133 5.92773C6.78576 5.89645 6.70484 5.87988 6.62305 5.87988Z" fill="currentColor"/>
			</svg>
		</button>
		<input type="text" class="site-search__input"
			placeholder="Search"
			v-model="searchTerm"
			@keyup.enter="doSearch"
			@keydown.esc.prevent="emit('update:searchOpen', false)"
			ref="searchInput"
		/>
		<button type="button" aria-label="Run search" class="site-search__submit"
			@click="doSearch"
		>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M13.643 13.67L16.723 16.75M15.75 8.25C15.75 10.2391 14.9598 12.1468 13.5533 13.5533C12.1468 14.9598 10.2391 15.75 8.25 15.75C6.26088 15.75 4.35322 14.9598 2.9467 13.5533C1.54018 12.1468 0.75 10.2391 0.75 8.25C0.75 6.26088 1.54018 4.35322 2.9467 2.9467C4.35322 1.54018 6.26088 0.75 8.25 0.75C10.2391 0.75 12.1468 1.54018 13.5533 2.9467C14.9598 4.35322 15.75 6.26088 15.75 8.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>
</template>
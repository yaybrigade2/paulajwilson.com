<script setup>

defineProps({
	content: {
		type: Object,
	},
})
</script>

<template>
	<template v-for="c in content">
		<!-- <ContentModuleHeading 
			v-if="'heading' === c.acf_fc_layout"
			:content="c"
		/>
		<ContentModuleBodyText 
			v-if="'body_text' === c.acf_fc_layout"
			:content="c"
		/> -->
		<ContentModuleImages 
			v-if="'images' === c.acf_fc_layout"
			:content="c"
		/>
		<!-- <ContentModuleButtons 
			v-if="'buttons' === c.acf_fc_layout"
			:content="c"
		/>
		<ContentModulePageTitle 
			v-if="'page_title' === c.acf_fc_layout"
			:content="c"
		/>
		<ContentModuleVideo 
			v-if="'video' === c.acf_fc_layout"
			:content="c"
		/> -->

	</template>
</template>
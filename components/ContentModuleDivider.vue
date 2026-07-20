<script setup>

const props = defineProps({
	content: {
		type: Object,
		required: true
	},
})

const space = props.content.space
const background = props.content.background
const icon = props.content.icon
const iconPosition = props.content.icon_position

const displayClass = ref('')

displayClass.value = `divider--space-${space} divider--background-${background} divider--icon-${icon} divider--icon-position-${iconPosition}`

</script>

<template>
	<div class="divider  module" :class="displayClass">
		<div class="divider__space"></div>
	</div>
</template>
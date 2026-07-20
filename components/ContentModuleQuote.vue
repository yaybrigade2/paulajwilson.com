<script setup>

const props = defineProps({
	content: {
		type: Object,
		required: true
	},
})

const quoteText = props.content.quote_text
const quoteAttribution = props.content.attribution_text
const quoteTextColor = props.content.quote_text_color
const quoteTextTypeface = props.content.quote_text_typeface
const quoteAlign = props.content.align

const displayClass = ref('')

displayClass.value += ' quote--text-color-' + quoteTextColor
displayClass.value += ' quote--text-typeface-' + quoteTextTypeface
displayClass.value += ' quote--align-' + quoteAlign

</script>

<template>
	<div class="quote  module" :class="displayClass">
		<div class="module__grid">
			<blockquote class="quote__text">
				{{ quoteText }}
			</blockquote>
			<cite class="quote__attribution"
				v-if="quoteAttribution"
			>
				<svg class="quote__attribution-line"
					width="128" height="75" viewBox="0 0 128 75" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0.25 0.433105L127.25 73.7566" stroke="currentColor"/>
				</svg>
				<p class="quote__attribution-text">{{ quoteAttribution }}</p>
			</cite>
		</div>	
	</div>
</template>
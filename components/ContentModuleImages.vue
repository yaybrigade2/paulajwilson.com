<script setup>
import { cloudinaryPath } from '~/helpers/helpers'

const props = defineProps({
	content: {
		type: Object,
		required: true
	},
})

const displayClass = ref('')
const cloudinaryParams = ref('')

displayClass.value += ' images--width-' + props.content.width
displayClass.value += ' images--align-' + props.content.align

if (props.content.offset) {
	displayClass.value += ' images--offset-'
}

// Cloudinary Params
cloudinaryParams.value = 'f_auto,c_limit,w_2000'

if (props.content.width === 'two-thirds') {
	cloudinaryParams.value = 'f_auto,c_limit,w_1500'
}
if (props.content.width === 'half') {
	cloudinaryParams.value = 'f_auto,c_limit,w_1000'
}

// Multiple images
if (props.content.images?.length > 1) {
	// displayClass.value += ' images--count-' + props.content.images.length

	cloudinaryParams.value = 'f_auto,c_limit,w_1000'

	if (props.content.width === 'two-thirds') {
		cloudinaryParams.value = 'f_auto,c_limit,w_750'
	}
	if (props.content.width === 'half') {
		cloudinaryParams.value = 'f_auto,c_limit,w_500'
	}
}
</script>

<template>
	<div class="images  module" :class="displayClass">
		<div class="module__grid">
			<div class="images__wrapper">
				<figure class="images__image" v-for="(img, i) in content.images" :key="img.image.id">
					<img 
						:src="cloudinaryPath(img.image.url, cloudinaryParams + '/')" 
						:alt="img.image.alt"
					/>
					<figcaption v-if="img.caption" v-html="img.caption"></figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>
<script setup>

const props = defineProps({
	content: {
		type: Object,
		required: true
	},
})

// const imageCount = props.content.images.length

// const displayClass = ref('')
// const cloudinaryParams = ref('')

// displayClass.value = 'images--width-' + props.content.width
// cloudinaryParams.value = 'f_auto,c_limit,w_2000'

// if (props.content.width === 'text-column') {
// 	cloudinaryParams.value = 'f_auto,c_limit,w_1500'
// }
// if (props.content.width === 'half') {
// 	cloudinaryParams.value = 'f_auto,c_limit,w_1000'
// }

// Multiple images
// if (imageCount > 1) {
// 	displayClass.value += ' images--display-' + props.content.multiple_images

// 	if (props.content.multiple_images === 'two-columns') {
// 		cloudinaryParams.value = 'f_auto,c_limit,w_1000'
// 	}
// 	if (props.content.multiple_images === 'three-columns') {
// 		cloudinaryParams.value = 'f_auto,c_limit,w_700'
// 	}
// 	if (props.content.multiple_images === 'slideshow') {
// 		cloudinaryParams.value = 'ar_4,w_1800,c_fill,g_auto'
// 	}
// }

</script>

<template>
	<div class="images  module" :class="displayClass">
		<div class="images__grid">
			<div class="images__wrapper">
				<div class="images__slideshow-status  images__slideshow-status--running" v-if="imageCount > 1 && 'slideshow'==content.multiple_images &&slideShowRunning">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8 6L18 12L8 18V6Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
				<figure class="images__img" v-for="(img, i) in content.images" :key="img.image.id"
					:class="{ 'images__img--active': i === slideshowActiveImage && content.multiple_images === 'slideshow' }"
					@click="slideShowRunning = !slideShowRunning"
					>
					<img 
						:src="cloudinaryPath(img.image.url, cloudinaryParams + '/')" 
						:alt="img.image.alt"
					/>
					<figcaption v-if="img.caption" class="images__caption" v-html="img.caption"></figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>
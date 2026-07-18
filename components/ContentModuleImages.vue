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
	displayClass.value += ' images--offset'
}

// ANCHOR Cloudinary Params
cloudinaryParams.value = 'f_auto,c_limit,w_2000'

if (props.content.width === 'two-thirds') {
	cloudinaryParams.value = 'f_auto,c_limit,w_1500'
}
if (props.content.width === 'half') {
	cloudinaryParams.value = 'f_auto,c_limit,w_1000'
}

// ANCHOR Multiple images
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

// ANCHOR Caption Link

const router = useRouter()

const internalLinkPath = (img) => {
	const postType = img?.internal_link?.[0]?.post_type
	const postName = img?.internal_link?.[0]?.post_name

	if (!postType || !postName) {
		return ''
	}

	if (postType === 'page') {
		return '/' + postName
	}

	return '/' + postType + '/' + postName
}

const escapeRegExp = (value) => {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const captionWithInternalLink = (img) => {
	const caption = img?.caption || ''
	const path = internalLinkPath(img)
	const findInCaptionAndMakeLink = img?.link_text_in_caption

	console.log(findInCaptionAndMakeLink)

	if (!caption) {
		return ''
	}

	if (!path || !findInCaptionAndMakeLink || !caption.includes(findInCaptionAndMakeLink)) {
		return caption
	}

	const findTokenRegex = new RegExp(escapeRegExp(findInCaptionAndMakeLink), 'g')
	const replacement = '<a href="' + path + '">' + findInCaptionAndMakeLink + '</a>'

	return caption.replace(findTokenRegex, replacement)
}

const onCaptionClick = (event) => {
	const anchor = event.target?.closest?.('a')

	if (!anchor) {
		return
	}

	const href = anchor.getAttribute('href')
	if (!href || !href.startsWith('/')) {
		return
	}

	if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
		return
	}

	event.preventDefault()
	router.push(href)
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
					<figcaption v-if="img.caption" @click="onCaptionClick" v-html="captionWithInternalLink(img)"></figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>
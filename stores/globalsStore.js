import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', () => {
	const globals = ref({
		cloudinaryPrefix: 'https://res.cloudinary.com/xxx_ID_xxx/image/fetch/',
		useCloudinary: true, // Note: In development, restart the server to see changes
	})

	return { globals }
})

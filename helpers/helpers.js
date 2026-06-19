import { useGlobalsStore } from '~/stores/globalsStore'

// ***
// Function: cloudinaryPath
export const cloudinaryPath = function (url, cloudinaryOptions) {

	// Get global options
	const globalsStore = useGlobalsStore();
	const globals = computed(() => globalsStore.globals);

	if (globals.value.useCloudinary) {
		return globals.value.cloudinaryPrefix + cloudinaryOptions + url
	} else {
		return url
	}
}

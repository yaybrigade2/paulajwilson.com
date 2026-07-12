// ***
// Function: cloudinaryPath
export const cloudinaryPath = function (url, cloudinaryOptions) {

	const cloudinaryPrefix = 'https://res.cloudinary.com/paulajwilson/image/fetch/'
	const useCloudinary = true 

	if (useCloudinary) {
		return cloudinaryPrefix + cloudinaryOptions + url
	} else {
		return url
	}
}

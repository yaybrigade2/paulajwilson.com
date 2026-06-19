// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: ['@pinia/nuxt', '@nuxtjs/sitemap', '@nuxtjs/robots', 'nuxt-gtag'],
	app: {
		head: {
			bodyAttrs: {
			},
			link: [
				// { rel: 'icon', type: 'image/png', href: '/favicon/favicon-48x48.png', sizes: '48x48' },
				// { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
				// { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
				// { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
				// { rel: 'manifest', href: '/favicon/site.webmanifest' },
			],
			meta: [
				// { name: 'apple-mobile-web-app-title', content: 'Site Title' },
				// { name: 'google-site-verification', content: 'UCJi_wsjlNWv_Wic2UilYy0cGTorbiSemttzjOT8Ptw' },
			],
		},
	},
	site: { 
		// url: 'https://www.site.com', 
		// name: 'Site Title' 
	},
	sitemap: {
		sources: [
			// 'https://data.dibolldesigncenter.com/wp-json/diboll/v1/urls',
		]
	},
	gtag: {
		// id: 'G-NQ4EKRVX5H'
	},	
})

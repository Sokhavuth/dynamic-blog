/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Vidaloka", "OdorMeanChey", ...defaultTheme.fontFamily.sans],
				title: ['StardosStencil', 'Limonf3'],
				display: ['Oswald', "Koulen"],
      			body: ['"Vidaloka"', "OdorMeanChey"],
			},
		},
	},
	plugins: [],
}
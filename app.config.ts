export default defineAppConfig({
	blogName: "Naiquoy's Blog",
	nav: {
		navItem: [
			{
				title: 'Something',
				subItem: [
					{
						name: 'Google',
						href: 'https://www.google.com',
					},
				],
			},
		],
		toolItem: [
			{
				name: 'Github',
				href: 'https://www.naiquoy.com',
				icon: ['fi', 'fi-brands-github'],
				target: '_blank',
			},
		],
	},
})

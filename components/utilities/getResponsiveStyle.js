
export default async (options) => {
	const lib = await import('muuri-react')
	return lib.getResponsiveStyle(options)
}
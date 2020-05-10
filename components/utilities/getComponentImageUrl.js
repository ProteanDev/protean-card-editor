
export default async (componentId = '') => {
	if (window) {
		window.scrollTo(0,0) // this should fix the unrendered parts for html2canvas
	}
	const input = document.getElementById(`${componentId}`)
	const height = input.clientHeight;
	const width = input.clientWidth;
	let dataUrl = null
	const html2canvas = await import('html2canvas')
	const canvas = await html2canvas.default(input)
	// document.body.appendChild(canvas)
	
	
	dataUrl = canvas.toDataURL('image/png')
	// console.log('ENTERED: ', dataUrl)

	return { dataUrl, height: height / 1.5, width: width / 1.5 }
}
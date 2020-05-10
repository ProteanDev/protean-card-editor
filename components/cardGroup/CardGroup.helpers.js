import getComponentImageUrl from '../utilities/getComponentImageUrl'
import { Image } from '@react-pdf/renderer'

const getPrintableCards = async (cards = []) => {
	const printableCards = []
	const imageDataUrls = []
	for (const card of cards) {
		const { dataUrl, height, width } = await getComponentImageUrl(card.id)
		imageDataUrls.push({ dataUrl, height, width })

		printableCards.push(<Image
			wrap={false}
			key={card.id}
			src={`${dataUrl}`}
			style={{ height, width, marginTop: '5px', marginBottom: '5px', }}
		/>)
	}
	return { printableCards, imageDataUrls }
}

const getPrintableCardGroup = async () => {

	const { dataUrl, height, width } = await getComponentImageUrl('cardGroup')
	console.log('dataUrl: ', dataUrl)
	return <Image
		wrap={false}
		key={'cardGroup'}
		src={`${dataUrl}`}
		style={{ height, width, flex: 1 }}
	/>

}

export default {
	getPrintableCards,
	getPrintableCardGroup,
}
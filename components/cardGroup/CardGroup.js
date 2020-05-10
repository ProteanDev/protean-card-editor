import React, { useState, useCallback, useEffect } from 'react'
// import dynamic from 'next/dynamic'
import nextId from 'react-id-generator'
import { Button, Icon, Dimmer, Loader } from 'semantic-ui-react'
import styles from './CardGroup.styles'
import helpers from './CardGroup.helpers'
import CardView from '../cardView/CardView'
import cardViewHelpers from '../cardView/CardView.helpers'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Printable from './CardGroup.printable'
// const DragArea = dynamic(() => import('muuri-react').then(mod => mod.MuuriComponent))
import dragAndDropHelpers from '../utilities/dragDropComponent/DragDrop.helpers'
const {
	// generateDraggableItems,
} = dragAndDropHelpers

const {
	StyledCardGroup,
	StyledControlButtonsContainer,
} = styles

const {
	getPrintableCards,
} = helpers
const { DEFAULT_CARD_PROPS } = cardViewHelpers

const initialState = {
	cards: [],
	currentEditing: null,
	printPreviewOn: false,
	printableCards: [],
	processingPrintable: false,
}

const CardGroup = () => {
	const [state, setState] = useState(initialState)
	const {
		cards,
		currentEditing,
		printPreviewOn,
		printableCards,
		processingPrintable,
	} = state

	const filteredCards = cards
	.filter(card => {
		if(!currentEditing) {
			return true
		}
		return `${card.id}` === `${currentEditing}`
	})

	const setEditing = (cardId = null) => setState({ ...state, currentEditing: cardId })
	const updateCard = (updatedCard = null) => {
		if (!updatedCard) { return }

		const newCards = [...cards]
		const card = cards.find(card => card.id === updatedCard.id)
		if (card) {
			const index = cards.indexOf(card);
			if (index > -1) {
				newCards[index] = updatedCard
			}
		}

		// to test if cards are updating their data
		// console.log('cards: ', cards)
		// console.log('newCards: ', newCards)

		setState({ ...state, cards: [...newCards] })
	}
	const addCard = (card = DEFAULT_CARD_PROPS) => {
		const newCard = { ...card, id: `${nextId()}` }
		setState({ ...state, currentEditing: null, cards: [ ...cards, newCard ] })
		return newCard
	}
	const removeCard = (id = null) => {
		if (!id) { return }

		const newCards = [...cards]
		const card = cards.find(card => card.id === id)
		if (card) {
			const index = cards.indexOf(card);
			if (index > -1) {
				newCards.splice(index, 1);
			}
		}

		setState({ ...state, currentEditing: null, cards: [...newCards] })
	}
	const duplicateCard = (cardId = '') => {
		const card = cards.find(c => c.id === cardId)
		if (card) {
			const newCard = addCard(card)
			if (window) {
				window.location.hash = `#${newCard.id}` // doesn't seem to work
			}
		}
	}
	const togglePrintPreview = () => {
		setState({ ...state, printableCards: [], printPreviewOn: !printPreviewOn })
	}

	const cardsToRender = filteredCards
	.map(card => <CardView
		key={`${card.id}`}
		cardProps={{ ...card }}
		removeCard={removeCard}
		setEditing={setEditing}
		updateCard={updateCard}
		duplicateCard={duplicateCard}
		printPreviewOn={printPreviewOn}
	/>)

	const generatePrintable = () => {
		setState({
			...state,
			printableCards: [],
			processingPrintable: true,
		})

		getPrintableCards(filteredCards)
		.then(({ printableCards: pCs  }) => {
			setState({
				...state,
				printableCards: pCs,
				processingPrintable: false,
			})
			if (window) {
				window.location.hash = `#downloadButton`
			}
		})
	}

	return <>
		<StyledCardGroup printPreviewOn={printPreviewOn} id={'cardGroup'}>
			{/* {!printPreviewOn &&
				<DragArea dragEnabled>
					{generateDraggableItems(cardsToRender)}
				</DragArea>
			}
			{printPreviewOn && cardsToRender} */}
			{cardsToRender}
			<StyledControlButtonsContainer>
				{!currentEditing &&
					<>
						{!printPreviewOn &&
							<Button size='big' positive circular onClick={() => addCard()} >
								<Icon name={'plus'} /> New Card
							</Button>
						}
						{(cards.length > 0 && !processingPrintable) &&
							<Button size='big' primary circular onClick={() => togglePrintPreview()} >
								<Icon name={printPreviewOn ? 'edit' : 'search'} /> {printPreviewOn ? 'Edit' : 'Print Preview'}
							</Button>
						}
						{printPreviewOn &&
							<>
								{!processingPrintable &&
									<>
										{!printableCards.length &&
											<Button size='big' color={'google plus'} circular onClick={() => generatePrintable()} >
												<Icon name={'file pdf outline'} /> Generate PDF
											</Button>
										}
										{printableCards.length > 0 &&
											<Button size='big' basic circular color='blue' id={'downloadButton'}>
												<Icon name={'download'} />
												<PDFDownloadLink
													document={<Printable cards={printableCards}/>}
													fileName={'cards.pdf'}
													style={{ flex: 1 }}
												>
													{({ loading, error }) => !error ? (loading ? 'Loading document...' : 'Download') : `Error: ${error}`}
												</PDFDownloadLink>
											</Button>
										}
									</>
								}
							</>
						}
					</>
				}
			</StyledControlButtonsContainer>
		</StyledCardGroup >
		<Dimmer active={processingPrintable} page>
			<Loader indeterminate>Processing</Loader>
		</Dimmer>
	</>
}

export default CardGroup
import React from 'react'
import nextId from 'react-id-generator'
import { noop } from 'lodash'
import { Input, Form, TextArea } from 'semantic-ui-react'
import CardTypesDropDown, { DEFAULT_CARD_TYPES, DEFAULT_CARD_SUBTYPES } from '../utilities/CardTypeDropDown'
import ImageSelector from '../utilities/ImageSelector'
import IconCounter from '../iconCounter/IconCounter'
import styles from './CardView.styles'

const {
	StyledCardName,
	StyledCardImageContainer,
	StyledQRCode,
	StyledCardImage,
	StyledCardTypes,
	StyledCardDescription,
	StyledCardFootnote,
	StyledGuideText,
} = styles

const DEFAULT_CARD_PARTS_ANCHOR_ORDER = [1, 7, 14, 22, 23, 24]

const DEFAULT_CARD_PROPS = {
	id: `${nextId()}`,
	name: 'Card Name',
	cost: 3,
	imagePath: null,
	cardType: DEFAULT_CARD_TYPES[0],
	subType: DEFAULT_CARD_SUBTYPES[0],
	description: 'Card Description',
	footnote: 'Card Footnote',
	anchors: DEFAULT_CARD_PARTS_ANCHOR_ORDER
}

const getCardPart = (index, anchors, cardParts) => {
	const anchorValue = (index + 1)
	return anchors.includes(anchorValue) ? cardParts[anchors.indexOf(anchorValue)] : null
}

const getCardParts = (
	cardState = DEFAULT_CARD_PROPS,
	setCardState = noop,
	editing = false,
) => {
	const { name, imagePath, cardType, subType, description, footnote } = cardState
	const updateCardState = (updatedValue) => setCardState(updatedValue)

	const CardImage = () => <StyledCardImageContainer>
		{!imagePath &&
			<StyledQRCode
				renderAs={'svg'}
				value={JSON.stringify({ ...cardState, imagePath: null })}
				fgColor={'gray'}
			/>
		}
		{imagePath && <StyledCardImage id='Image' draggable={false} src={imagePath} />}
		{editing && <ImageSelector state={cardState} setState={updateCardState} />}
	</StyledCardImageContainer>

	const CardCost = () => <IconCounter icon={cardType.icon} state={cardState} setState={updateCardState} editing={editing} />

	const editingSet = [
		<div key='cardName'>
			<Form>
				<Input
					placeholder={`${DEFAULT_CARD_PROPS.name}`}
					value={name}
					onChange={v => updateCardState({ ...cardState, name: `${v.target.value}` })}
				/>
			</Form>
		</div>,
		<div key='cardCost'>
			<CardCost />
		</div>,
		<div key='cardImage'>
			<CardImage />
		</div>,
		<div key='cardTypes'>
			<>
				<CardTypesDropDown
					defaultCardType={cardType}
					onChange={v => updateCardState({ ...cardState, cardType: v })}
				/>
				<CardTypesDropDown
					isSubType
					defaultCardType={subType}
					onChange={v => updateCardState({ ...cardState, subType: v })}
				/>
			</>
		</div>,
		<div key='cardDesc'>
			<Form>
				<TextArea placeholder={`${DEFAULT_CARD_PROPS.description}`}
					value={description}
					onChange={v => updateCardState({ ...cardState, description: v.target.value })}
				/>
			</Form>
		</div>,
		<div key='cardFooter'>
			<Form>
				<Input
					placeholder={`${DEFAULT_CARD_PROPS.footnote}`}
					value={footnote}
					onChange={v => updateCardState({ ...cardState, footnote: `${v.target.value}` })}
				/>
			</Form>
		</div>,
		<div key={'cardPlaceHolderDiv1'} style={{ color: 'lightgray' }} >FREE SPACE</div>,
		<div key={'cardPlaceHolderDiv2'} style={{ color: 'lightgray' }}>FREE SPACE</div>,
		<div key={'cardPlaceHolderDiv3'} style={{ color: 'lightgray' }}>FREE SPACE</div>,
	]

	const displaySet = [
		<div key='cardName'>
			<StyledCardName draggable={false} >{`${name}`}</StyledCardName>
		</div>,
		<div key='cardCost'>
			<CardCost />
		</div>,
		<div key='cardImage'>
			<CardImage />
		</div>,
		<div key='cardTypes'>
			<StyledCardTypes draggable={false}>
				{
					`${cardType === DEFAULT_CARD_TYPES[0] ? 'Card Type' : `${cardType.text}`}
					- ${subType === DEFAULT_CARD_SUBTYPES[0] ? 'Card SubType' : `${subType.text}`}`
				}
			</StyledCardTypes>
		</div>,
		<div key='cardDesc'>
			<StyledCardDescription draggable={false}>
				{`${description}`}
			</StyledCardDescription>
		</div>,
		<div key='cardFooter'>
			<StyledCardFootnote draggable={false} >{`${footnote}`}</StyledCardFootnote>
		</div>,
		// <div key={'cardPlaceHolderDiv1'} />,
		// <div key={'cardPlaceHolderDiv2'} />,
		// <div key={'cardPlaceHolderDiv3'} />,
	]

	return editing ? editingSet : displaySet
}

const getAnchorValueByGridCoordinate = (anchorCounter = 0, vertical = 0, horizontal = 0, inner = 0) => {
	const initialValues = Array(anchorCounter).fill().map((v, i) => i + 1)
	const verticalDivideCount = Math.abs(initialValues.length / 3)
	const horizontalDivideCount = Math.abs(verticalDivideCount / 3)
	let posisbleVerticalValues = []
	let posisbleHorizontalValues = []

	switch (vertical) {
		case 1:
			posisbleVerticalValues = initialValues.slice(verticalDivideCount, verticalDivideCount * 2)
			break
		case 2:
			posisbleVerticalValues = initialValues.slice(verticalDivideCount * 2, verticalDivideCount * 3)
			break
		default:
			posisbleVerticalValues = initialValues.slice(0, verticalDivideCount)
			break
	}

	switch (horizontal) {
		case 1:
			posisbleHorizontalValues = posisbleVerticalValues.slice(horizontalDivideCount, horizontalDivideCount * 2)
			break
		case 2:
			posisbleHorizontalValues = posisbleVerticalValues.slice(horizontalDivideCount * 2, horizontalDivideCount * 3)
			break
		default:
			posisbleHorizontalValues = posisbleVerticalValues.slice(0, horizontalDivideCount)
			break
	}

	return posisbleHorizontalValues[inner]
}

const PositionGuides = ({index, horizontal = false}) => <StyledGuideText
	draggable={false}
	onDrop={e => e.stopPropagation()}
	key={`l${index}`}
>
	{index ? ((index < 2) ? 'CENTER' : horizontal ? 'RIGHT' : 'BOTTOM') : horizontal ? 'LEFT' : 'TOP'}
</StyledGuideText>

export default {
	DEFAULT_CARD_PARTS_ANCHOR_ORDER,
	DEFAULT_CARD_PROPS,
	getCardPart,
	getCardParts,
	getAnchorValueByGridCoordinate,
	PositionGuides,
}
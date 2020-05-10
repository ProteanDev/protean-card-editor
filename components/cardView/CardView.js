import React, { useState, useEffect } from 'react'
import { noop } from 'lodash'
import { Button, Icon } from 'semantic-ui-react'
import dragDropComponents from '../utilities/dragDropComponent/DragDrop'

import styles from './CardView.styles'
import helpers from './CardView.helpers'

const {
	Draggable,
	Droppable,
} = dragDropComponents

const {
	StyledCardArea,
	StyledCardViewContainer,
	StyledCardViewHorizontalContainer,
	StyledCardViewButtonsContainer,
	StyledRowContainer,
	StyledRowItemContainer,
	StyledAnchorCounterContainer,
	StyledCardViewToolsContainer,
} = styles

const {
	DEFAULT_CARD_PROPS,
	getCardPart,
	getCardParts,
	getAnchorValueByGridCoordinate,
	PositionGuides,
} = helpers

const INITIAL_CARDVIEW_STATE = {
	editing: false,
}

const CardView = ({
	cardProps = DEFAULT_CARD_PROPS,
	removeCard = noop,
	setEditing = noop,
	updateCard = noop,
	duplicateCard = noop,
	printPreviewOn = false,
}) => {
	// Check if we are on the server.
  // const isSSR = typeof window === 'undefined'
	// ui state
	const [state, setState] = useState(INITIAL_CARDVIEW_STATE)
	const { editing } = state
	// card state SHOULD ON BE EDITED IN CARD GROUP via updateCard
	const { id, anchors } = cardProps
	// anchor value from where you start dragging
	const [draggingFrom, setDraggingFrom] = useState(0)

	let anchorCounter = 0
	const renderAnchorNumber = (_editing = false) => {
		anchorCounter++
		return _editing ? <StyledAnchorCounterContainer draggable={false} onDrop={e => e.stopPropagation()}>
			{anchorCounter}
		</StyledAnchorCounterContainer> : null
	}

	const handleDrop = (success, index1, index2, index3) => {
		const dropAnchorValue = getAnchorValueByGridCoordinate(anchorCounter, index1, index2, index3)
		if (success) {
			const newAnchors = [...anchors]
			const indexToChange = newAnchors.indexOf(draggingFrom)

			if (indexToChange === -1) {
				newAnchors.push(dropAnchorValue)
			} else {
				// change the saved anchor for the item
				newAnchors[indexToChange] = dropAnchorValue
			}
			
			updateCard({ ...cardProps, anchors: newAnchors })
		}
	}

	const handleDrag = (index1, index2, index3) => {
		const originalAnchorValue = getAnchorValueByGridCoordinate(anchorCounter + 1, index1, index2, index3)
		setDraggingFrom(originalAnchorValue)
	}
	
	return <StyledCardViewContainer>
		<StyledCardViewHorizontalContainer>
			<StyledCardArea id={id} editing={editing} printPreviewOn={printPreviewOn}>
				{
					Array(3).fill().map((v, i) =>
						<div key={`${i}`} >
							{editing && <PositionGuides index={i} />}
							<StyledRowContainer key={`c${i}`}>
								{
									Array(3).fill().map((v, j) =>
										<StyledRowItemContainer key={`${j}`} editing={editing}>
											<div key={`c${j}`}>
											{editing && <PositionGuides index={j} horizontal/>}
												{
													Array(3).fill().map((v, k) =>
														<Droppable disabled={!editing} key={`${k}`} onDrop={success => handleDrop(success, i, j, k)} >
															<Draggable disabled={!editing} onDrag={() => handleDrag(i, j, k)} >
																<>
																	{
																		getCardPart(
																			anchorCounter,
																			anchors,
																			getCardParts(cardProps, updateCard, editing)
																		)
																	}
																</>
															</Draggable>
															{renderAnchorNumber(editing)}
														</Droppable>
													)
												}
											</div>
										</StyledRowItemContainer>
									)
								}
							</StyledRowContainer>
						</div>
					)
				}
			</StyledCardArea>
			{editing &&
				<StyledCardViewToolsContainer printPreviewOn={printPreviewOn}>
					Card Tools Coming Soon
				</StyledCardViewToolsContainer>
			}
		</StyledCardViewHorizontalContainer>
		{!printPreviewOn &&
			<StyledCardViewButtonsContainer printPreviewOn={printPreviewOn}>
				<Button
					primary={editing}
					basic={!editing}
					color='blue'
					circular={!editing}
					onClick={() => {
						setState({ ...state, editing: !editing })
						setEditing(!editing ? cardProps.id : null)
					}}
					size={editing ? 'medium' : 'mini'}
				>
					<Icon name={editing ? 'save' : 'edit'} />
					{editing ? 'Save' : 'Edit'}
				</Button>
				{!editing &&
					<Button
						primary
						circular
						icon
						onClick={() => duplicateCard(cardProps.id)}
						size={editing ? 'medium' : 'mini'}
					>
						<Icon name={'copy'} />
					</Button>
				}
				<Button
					negative
					circular={!editing}
					icon
					onClick={() => removeCard(cardProps.id)}
					size={editing ? 'medium' : 'mini'}
				>
					<Icon name={'trash'} />
				</Button>
			</StyledCardViewButtonsContainer>
		}
	</StyledCardViewContainer>
}

export default CardView
import React from 'react'
import nextId from 'react-id-generator'
import styles from './DragDrop.styles'
const {
	StyledMuuriItem,
	StyledMuuriItemContent
} = styles

const generateDraggableItems = (components = [], editing = false) => components.map(c => {
	return <StyledMuuriItem key={`${nextId()}`} editing={editing}>
		<StyledMuuriItemContent editing={editing}>
			{c}
		</StyledMuuriItemContent>
	</StyledMuuriItem>
})

export default {
	generateDraggableItems,
}
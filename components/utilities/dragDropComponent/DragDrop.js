import React, { useState } from 'react'
import { noop } from 'lodash'
import nextId from 'react-id-generator'

import styles from './DragDrop.styles'
const {
	StyledDroppable,
	StyledDraggable,
} = styles

const Droppable = ({
	id = `${nextId()}`,
	children = [],
	disabled = false,
	onDrop = noop,
}) => {
	if (!children) {
		return null
	}
	const [hovering, setHovering] = useState(false)

	const handleDrop = (e) => {
		e.preventDefault()
		setHovering(false)
		const data = e.dataTransfer.getData('transfer')
		const node = document.getElementById(data)
		if (node && e.target) {
			e.target.appendChild(node)
			onDrop(true)
		}
	}

	return <StyledDroppable
		id={id}
		disabled={disabled}
		hovering={hovering}
		draggable={false}
		onDrop={handleDrop}
		onDragOver={e => e.preventDefault()}
		onDragEnter={e => {
			e.preventDefault()
			setHovering(true)
		}}
		onDragLeave={e => {
			e.preventDefault()
			setHovering(false)
		}}
	>
		{children && children}
	</StyledDroppable>
}

const Draggable = ({
	id = `${nextId()}`,
	children = [],
	disabled = false,
	onDrag = noop
}) => {
	if (!children) {
		return null
	}

	const prepareForDrag = (e) => {
		if (disabled) {
			e.stopPropagation()
			return
		}

		if (e.dataTransfer && e.target) {
			e.dataTransfer.setData('transfer', e.target.id)
		}
		onDrag()
	}

	return <StyledDraggable
		id={id}
		disabled={disabled}
		draggable={!disabled}
		onMouseOverCapture={prepareForDrag}
		onMouseLeave={e => e.stopPropagation()}
		onDragStart={prepareForDrag}
		onDragOver={e => e.stopPropagation()}
		hasValidChildren={children.props.children}
	>
		{children && children}
	</StyledDraggable>
}

export default {
	Droppable,
	Draggable
}
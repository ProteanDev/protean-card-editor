import React, { useState } from 'react'
import { noop } from 'lodash'
import { Dropdown } from 'semantic-ui-react'

export const DEFAULT_CARD_TYPES = [
	{ key: 0, text: 'None - Card Type', value: 0, icon: 'leaf' },
	{ key: 1, text: 'Any', value: 1, icon: 'dna' },
	{ key: 2, text: 'Tech', value: 2, icon: 'hand scissors' },
	{ key: 3, text: 'Skill', value: 3, icon: 'hand rock' },
	{ key: 4, text: 'Talent', value: 4, icon: 'hand paper' },
]

export const DEFAULT_CARD_SUBTYPES = [
	{ key: 0, text: 'None - Card Subtype', value: 0 },
	{ key: 1, text: 'Knowledge', value: 1 },
	{ key: 2, text: 'Delegate', value: 2 },
	{ key: 3, text: 'Attachment', value: 3 },
	{ key: 4, text: 'Sequence', value: 4 },
	{ key: 5, text: 'Countdown', value: 5 },
]

const CardTypesDropDown = ({
	isSubType = false,
	cardTypes = isSubType ? DEFAULT_CARD_SUBTYPES : DEFAULT_CARD_TYPES,
	defaultCardType = cardTypes[0],
	onChange = noop,
}) => {
	const [localCardType, setLocalCardType] = useState(defaultCardType)

	return <Dropdown
		draggable={false}
		onChange={(e, { value }) => {
			const seletedType = cardTypes.find(v => v.value === value)
			onChange(seletedType)
			setLocalCardType(seletedType)
		}}
		options={cardTypes}
		placeholder='Choose a Card Type'
		fluid
		selection
		value={localCardType.value}
	>
	</Dropdown>
}

export default CardTypesDropDown
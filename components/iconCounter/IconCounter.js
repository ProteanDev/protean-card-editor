import React from 'react'
import { noop } from 'lodash'
import { Button, Icon, Input } from 'semantic-ui-react'
import { DEFAULT_CARD_TYPES } from '../utilities/CardTypeDropDown'
import styles from './IconCounter.styles'

const {
	StyledIconContainer,
	StyledFloatingButtonsContainer,
} = styles

const IconCounter = ({
	icon = DEFAULT_CARD_TYPES[0].icon,
	state = {},
	setState = noop,
	editing = false,
}) => {
	const { cost } = state

	return <div draggable={false}>
		<StyledIconContainer draggable={false}>
			{(cost !== 0 && cost <= 5) &&
				Array(cost).fill().map((v, i) => <Icon key={`${i}`} name={icon} />)
			}
			{cost === 0 && 'FREE'}
			{cost > 5 &&
				<>
					<Icon name={icon} />
					{`${cost}`}
				</>
			}
		</StyledIconContainer>
		<StyledFloatingButtonsContainer draggable={false}>
			{editing &&
				<Button.Group>
					<Button disabled={cost === 0} icon onClick={e => {
						e.preventDefault()
						setState({ ...state, cost: state.cost -= 1 })
					}}>
						<Icon name='minus' />
					</Button>
					<Button.Or />
					<Button positive icon onClick={e => {
						e.preventDefault()
						setState({ ...state, cost: state.cost += 1 })
					}}>
						<Icon name='plus' />
					</Button>
				</Button.Group>
			}
		</StyledFloatingButtonsContainer>
	</div>
}

export default IconCounter
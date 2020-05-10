import React from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'
import { noop } from 'lodash'
import helpers from '../cardView/CardView.helpers'
// const { DEFAULT_CARD_PROPS } = helpers // for some reason Next js doesn't like this

const ImageSelector = ({ state = { imagePath: helpers.DEFAULT_CARD_PROPS.imagePath }, setState = noop }) => {
	const { imagePath } = state
	return <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column', alignItems: 'center' }}>
	<Input
		draggable={false}
		type='file'
		accept="image/*"
		size="mini"
		onChange={v => {
			const { target } = v
			const { files } = target
			if (files && files[0]) {
				const reader = new FileReader()
				reader.readAsDataURL(files[0])
				reader.onload = (e) => setState({ ...state, imagePath: e.target.result })
			}
		}}
	/>
	{imagePath &&
		<Button size='mini' fluid negative onClick={() => setState({ ...state, imagePath: null })}>
			Remove Image
		</Button>
	}
	</div>
}

export default ImageSelector
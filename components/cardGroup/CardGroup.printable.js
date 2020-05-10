import React from 'react'
import { Document, Page } from '@react-pdf/renderer'
import styles from './CardGroup.printable.styles'
const { StyledPage } = styles

export default ({
	cards = [],
	pageSize = 'A4',
}) => <Document>
	<StyledPage size={pageSize} wrap>
		{cards}
	</StyledPage>
</Document>
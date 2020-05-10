import styled from '@react-pdf/styled-components'
import { View, Page } from '@react-pdf/renderer'

const StyledPage = styled(Page)`
flex-direction: row;
flex-wrap: wrap;
justify-content: space-around;
padding: 20px;
`

export default {
	StyledPage,
}
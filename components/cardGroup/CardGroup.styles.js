import styled from 'styled-components'

const StyledCardGroup = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
align-content: center;
padding: 20px;
`

const StyledControlButtonsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
padding: 20px;
min-height: 3.5in;
min-width: 2.5in;
background-color: transparent;
`

export default {
	StyledCardGroup,
	StyledControlButtonsContainer,
}
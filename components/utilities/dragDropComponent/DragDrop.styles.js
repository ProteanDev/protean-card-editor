import styled from 'styled-components'

const StyledDroppable = styled.div`
display: flex;
flex: 1;
justify-content: space-evenly;
flex-direction: column;
border: ${props => props.disabled ? '0px' : '0.5px dashed lightgrey'};
align-items: center;
overflow: visible;
text-align: justify;
padding: ${props => props.disabled ? '0' : '20'}px;
background-color: ${props => props.hovering ? 'blue' : 'transparent'};
`

const StyledDraggable = styled.div`
border: ${props => (props.disabled || !props.hasValidChildren) ? '0px' : '1px solid black'};
border-radius: ${props => (props.disabled || !props.hasValidChildren)  ? '0' : '5'}px;
cursor: ${props => (props.disabled || !props.hasValidChildren)  ? 'auto' : 'grab'} ;
`

const StyledMuuriItem = styled.div`
position: absolute;
margin: ${props => props.editing ? '10px' : '0'};
cursor: ${props => props.editing ? 'grab' : 'normal'};
`

const StyledMuuriItemContent = styled.div`
display: flex;
/* border: ${props => props.editing ? '2px solid lightgray' : '0px'};
border-radius: 5px; */
/* height: ${props => props.editing ? '2in' : 'auto'};
width: ${props => props.editing ? '1.4in' : 'auto'}; */
justify-content: center;
align-items: center;
overflow: hidden;
`

export default {
	StyledDroppable,
	StyledDraggable,
	StyledMuuriItem,
	StyledMuuriItemContent,
}
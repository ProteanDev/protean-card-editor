import styled from 'styled-components'
import QRCode from 'qrcode.react'

const CONTENT_ITEM_PADDING = '5px 10px 5px 10px'

const StyledCardArea = styled.div`
flex: 1;
justify-content: space-between;
border: 1px solid lightgrey;
border-radius: 3px;
box-shadow: ${props => props.printPreviewOn ? '0px' : '3px 3px 3px 2px lightgrey'};
padding: 5px;
margin-bottom: 20px;
min-height: ${props => props.editing ? '7in' : '3.5in'};
min-width: ${props => props.editing ? '5in' : '2.5in'};
`

const StyledCardViewContainer = styled.div`
margin-bottom: 20px;
display: flex;
flex-direction: column;
`

const StyledCardViewHorizontalContainer = styled.div`
display: flex;
flex: 1;
flex-direction: row;
justify-content: space-around;
`

const StyledCardName = styled.div`
font-weight: bolder;
text-align: left;
text-overflow: hidden;
white-space: nowrap;
padding: ${CONTENT_ITEM_PADDING};
`

const StyledCardImageContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
align-content: center;
min-width: 2.1in;
min-height: 2.1in;
`

const StyledQRCode = styled(QRCode)`
position: absolute;
z-index: -100;
/* border-radius: 5px;
border: 1px dashed lightgray; */
padding: ${CONTENT_ITEM_PADDING};
height: 2.1in;
width: 2.1in;
`

const StyledCardImage = styled.img`
position: relative;
z-index: -100;
opacity: ${props => props.editing ? '0.5' : '1'};
height: auto;
width: 2.1in;
padding: ${CONTENT_ITEM_PADDING};
`

const StyledCardTypes = styled.div`
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
padding: ${CONTENT_ITEM_PADDING};
`

const StyledCardDescription = styled.p`
padding: ${CONTENT_ITEM_PADDING};
word-wrap: break-word;
`

const StyledCardFootnote = styled.div`
text-align: left;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
color: gray;
padding: ${CONTENT_ITEM_PADDING};
`

const StyledCardViewButtonsContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`

const StyledGuideText = styled.div`
position: relative;
text-Align: center;
font-Size: 8px;
z-index: -50;
letter-spacing: 1.5px;
color: lightgray;
`

const StyledRowContainer = styled.div`
display: flex;
flex: 1;
flex-direction: row;
justify-content: space-between;
`

const StyledRowItemContainer = styled.div`
display: flex;
flex: 1;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
overflow: visible;
border: ${props => props.editing ? '0.5' : '0'}px dashed whitesmoke;
`

const StyledAnchorCounterContainer = styled.div`
position: absolute;
color: lightgray;
font-weight: bolder;
font-size: 14px;
opacity: 0.3;
z-index: -1000;
`

const StyledCardViewToolsContainer = styled.div`
position: absolute;
right: 20px;
padding: 20px;
display: flex;
justify-content: center;
background-color: whitesmoke;
`

export default {
	StyledCardArea,
	StyledCardViewContainer,
	StyledCardViewHorizontalContainer,
	StyledCardName,
	StyledCardImageContainer,
	StyledQRCode,
	StyledCardImage,
	StyledCardTypes,
	StyledCardDescription,
	StyledCardFootnote,
	StyledCardViewButtonsContainer,
	StyledGuideText,
	StyledRowContainer,
	StyledRowItemContainer,
	StyledAnchorCounterContainer,
	StyledCardViewToolsContainer,
}
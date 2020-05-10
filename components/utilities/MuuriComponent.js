import React from 'react'
import { MuuriComponent } from 'muuri-react'

// const options = {
//   dragSortHeuristics: {
//     sortInterval: 70
//   },
//   layoutDuration: 400,
//   dragRelease: {
//     duration: 400,
//     easing: 'ease-out'
//   },
//   dragEnabled: true,
//   // The placeholder of an item that is being dragged.
//   dragPlaceholder: {
//     enabled: true,
//     createElement: (item) => {
//       // The element will have the Css class ".muuri-item-placeholder".
//       return item.getElement().cloneNode(true)
//     }
// 	},
// }

export default (props = MuuriComponent.defaultProps) => <MuuriComponent {...props}/>
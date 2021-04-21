import React, { Component } from 'react';
import white from './pics/white.jpg';
import black from './pics/black.jpg';
import orange from './pics/orange.jpg';  
import axios from 'axios';

class Gallery extends Component {   


    state = {
        index: 0, 
        picList: [white, black, orange]
      }
      
      onClickNext= () => {
          if (this.state.index + 1 === this.state.picList.length ){
              this.setState({ 
                  index: 0 
                })
            } else {
                this.setState({
                    index: this.state.index + 1
                })
            }

          }
          onClickPrevious= () => {
            if (this.state.index - 1 === -1 ){
                this.setState({ 
                    index: this.state.picList.length - 1
                  })
              } else {
                  this.setState({
                      index: this.state.index - 1
                  })
              }
            }
      
      
      render() {
        return (

          <div>
            <img src={this.state.picList[this.state.index]} style={{"maxHeight":"40%","maxWidth":"40%"}} /> <br/>
            
            <button style={{"fontSize":"18px"}} onClick={this.onClickPrevious}> Previous </button>
            <button style={{"margin-left":"5px", "fontSize":"18px"}} onClick={this.onClickNext}> Next </button>
          </div>
        );
      }

}


export default Gallery;









// import React, {useContext, useEffect, useState} from 'react';
// import TimelineItem from "./TimelineItem";
// import {SharedContext} from '../../../contexts/shared-context'
// import WindowDimensions from '../../Utility/WindowDimensions'
// import {List} from '@material-ui/core'

// import { Button } from '@material-ui/core'


// function getFormattedData(items) {
//   const activities = {};
  
//   items.forEach(({monthOnly, timestamp, title, content, who, what, when, where, why, how, initial_id}, index) => {
//     const list = activities[monthOnly] || [];
//     list.push({
//       time: timestamp,
//       title,
//       content,
//       who,
//       what,
//       when,
//       where,
//       why,
//       how,
//       id: initial_id,
//       key: index,
//     });
//     activities[monthOnly] = list;
//   });
//   return activities;
// }

// // function Timeline({ items , queriedid}) {
// const Gallery = () => {

//   const windowSize = WindowDimensions()
//   let height = Math.floor(windowSize.height * 0.4)//////////////////////////////////////
//   let width = Math.floor(windowSize.width * 0.23)
//   const classes = props.muiClasses;
//   const sharedContext = useContext(SharedContext)
  
//   const rep = getFormattedData(sharedContext.state.rep)
//   const activities = getFormattedData(sharedContext.state.cluster);
//   const dates = Object.keys(activities);
//   const repdates = Object.keys(rep);
//   const [vis, setVis] = useState(false);
//   function visHandler(){
//     setVis(!vis)
//   }
//   return (
    
//     sharedContext.state.repid!==''?
//       <div className="time-line-ctnr">
//         <span style={{display:"flex", justifyContent:"space-between"}}>
//           <span style={{fontWeight:"bold", textAlign:"center"}}>Related Articles To Edge</span>
//           <Button onClick={visHandler}
//             variant = "outlined"
//             size = "small" 
//             style={{ fontSize: '12px', 
//             textTransform: "none",
//           alignContent:"right"}}
//           >
//           {vis?"Show Highlight Article of Cluster":"Show All Article in Cluster"}
//           </Button>
//         </span>
//         {vis?
//         <List className={classes.timelineBody} style={{width: `${width}px`, height: `${height}px`, overflow: 'auto'}}>
//           {dates.map(d => (
//             <ul className="time-line" key={d}>
//               <li className="time-label">
//                 <span>{d}</span>
//               </li>
//               {activities[d].map(({ time, title, who, what, where, when, why, how, content, id, repid, key }) => (
//                 <TimelineItem 
//                   time={time} 
//                   title={title} 
//                   content={content} 
//                   who={who} 
//                   what={what} 
//                   when={when} 
//                   where={where} 
//                   why={why} 
//                   how={how} 
//                   key={key} 
//                   id={id} 
//                   repid={sharedContext.state.repid}
//                   />
//               ))}
//             </ul>
//           ))}

//         </List>
//         : //Show highlight only
//         <List className={classes.timelineBody} style={{width: `${width}px`, height: `${height}px`, overflow: 'auto'}}>
//         {repdates.map(d => (
//           <ul className="time-line" key={d}>
//             <li className="time-label">
//               <span>{d}</span>
//             </li>
//             {rep[d].map(({ time, title, who, what, where, when, why, how, content, id, repid, key }) => (
//               <TimelineItem 
//                 time={time} 
//                 title={title} 
//                 content={content} 
//                 who={who} 
//                 what={what} 
//                 when={when} 
//                 where={where} 
//                 why={why} 
//                 how={how} 
//                 key={key} 
//                 id={id} 
//                 repid={sharedContext.state.repid}
//                 />
//             ))}
//           </ul>
//         ))}

//       </List>
// }
//       </div>
//     :
//     null
    
//   );


// }


// export default Timeline;

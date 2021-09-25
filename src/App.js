import React, { useState } from 'react'

import './App.css';
// import { initial } from 'lodash';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash"
import {v4} from "uuid"

const item = {
  id: v4(),
  name: "clean the house"
}

console.log(item)

function App() {
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: [item]
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  return (
    <div className="App">
      <DragDropContext onDragEnd={e => console.log(e)}>
        {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      
                    </div>
                  )
                }}
              </Droppable>
              </div>
            )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;

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

const item2 = {
  id: v4(),
  name: "car wash"
}


function App() {
  const [text, setText] = useState("")
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: [item,item2]
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

  const handleDragEnd = ({destination, source}) => {

    console.log("from", source)
    console.log("to", destination)
    if (!destination) {
      console.log("not dropped in droppable")
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      console.log("dropped in same palce")
      return
    }
    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}
    setState(prev => {
      prev= {...prev}

      // Reomove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)

      // Addint to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)





      return prev
    })
  }

  const addItem = () => {
    setState(prev=>{
      return {
      ...prev, 
      todo: {
        title: "title",
        items: [
          {
            id: v4(),
            name: text
          },
          ...prev.todo.items
        ]
      }
    }
    })
    setText("")
  }

  return (
    <div className="App">
      <div>
        <input type="text" value={text} onChange={(e) =>setText(e.target.value)}/>
        {text === "" ? "" : (
          <button onClick={addItem}> 
          Add
        </button>
        )}
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  console.log(snapshot)
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        return (
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot)
                              return (
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                  <span></span>
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
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

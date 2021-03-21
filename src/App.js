import { useState } from "react";
import initialData from "./initial-data";
import Column from "./Column";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [state, setState] = useState(initialData);

  const handleDragEnd = ({ destination, source, draggableId }) => {
    console.log(source, destination, draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = [...column.taskIds];

    console.log("Before", newTaskIds);

    newTaskIds.splice(source.index, 1);
    console.log( "After remove at source index", newTaskIds);

    newTaskIds.splice(destination.index, 0, draggableId);
    console.log( "After adding elememnt at destination index", newTaskIds);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {state.columnOrder.map((colId) => {
        const column = state.columns[colId];
        const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

export default App;

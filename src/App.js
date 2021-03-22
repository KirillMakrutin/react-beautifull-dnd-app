import { useState } from "react";
import initialData from "./initial-data";
import Column from "./Column";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

function App() {
  const [state, setState] = useState(initialData);
  const [startColumnIndex, setStartColumnIndex] = useState(-1);

  const handleDragStart = (start) => {
    document.body.style.color = "orange";
    document.body.style.transition = "background-color 0.2s ease";

    const homeIndex = state.columnOrder.indexOf(start.source.droppableId);
    setStartColumnIndex(homeIndex);
  };

  const handleDragUpdate = ({ destination }) => {
    const opacity = destination
      ? destination.index / Object.keys(state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const handleDragEnd = ({ destination, source, draggableId }) => {
    setStartColumnIndex(-1);

    console.log(source, destination, draggableId);

    document.body.style.color = "inherit";

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = state.columns[source.droppableId];
    const endColumn = state.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = [...startColumn.taskIds];

      console.log("Before", newTaskIds);

      newTaskIds.splice(source.index, 1);
      console.log("After remove at source index", newTaskIds);

      newTaskIds.splice(destination.index, 0, draggableId);
      console.log("After adding elememnt at destination index", newTaskIds);

      const newColumn = {
        ...startColumn,
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
    } else {
      const startTaskIds = [...startColumn.taskIds];
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const endTaskIds = [...endColumn.taskIds];
      endTaskIds.splice(destination.index, 0, draggableId);
      const newEndColumn = {
        ...endColumn,
        taskIds: endTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStartColumn.id]: newStartColumn,
          [endColumn.id]: newEndColumn,
        },
      };

      setState(newState);
    }
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Container>
        {state.columnOrder.map((colId, index) => {
          const column = state.columns[colId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              // allow forward movement
              isDropDisabled={startColumnIndex > index}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
}

export default App;

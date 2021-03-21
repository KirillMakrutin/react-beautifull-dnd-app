const intialData = {
  tasks: {
    "task-1": { id: "task-1", content: "t-1 cont" },
    "task-2": { id: "task-2", content: "t-2 cont" },
    "task-3": { id: "task-3", content: "t-3 cont" },
    "task-4": { id: "task-4", content: "t-4 cont" },
    "task-5": { id: "task-5", content: "t-5 cont" },
  },

  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

export default intialData;

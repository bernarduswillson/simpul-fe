// Libs
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

// Interface
import Task from "@/interfaces/task";

interface TaskState {
  data: Task[];
  filteredData: Task[];
  filter: string;
  loading: boolean;
}

// Initial values
const initialValues: TaskState = {
  data: [],
  filteredData: [],
  filter: 'all',
  loading: false,
};


const sortTasks = (tasks: Task[], currentDate: Date): Task[] => {
  return tasks.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : null;
    const dateB = b.date ? new Date(b.date) : null;

    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    }

    if (!a.isDone && !b.isDone) {
      if (dateA && dateB) {
        const isAPast = dateA < currentDate;
        const isBPast = dateB < currentDate;

        if (isAPast && isBPast) {
          return dateB.getTime() - dateA.getTime()
        }

        if (isAPast) return 1;
        if (isBPast) return -1;

        return dateA.getTime() - dateB.getTime();
      }

      if (dateA) return -1;
      if (dateB) return 1;

      return 0;
    }

    if (a.isDone && b.isDone) {
      if (dateA && dateB) {
        return dateB.getTime() - dateA.getTime();
      }

      if (dateA) return -1;
      if (dateB) return 1;

      return 0;
    }

    return 0;
  });
};

const applyFilter = (tasks: Task[], filter: string): Task[] => {
  if (filter === 'all') {
    return tasks;
  } else {
    return tasks.filter((task) => task.type === filter);
  }
};


export const taskSlice = createSlice({
  name: 'task',
  initialState: { value: initialValues },
  reducers: {
    // Set Tasks
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.value.data = action.payload;

      const currentDate = new Date();
      state.value.data = sortTasks(state.value.data, currentDate);
      state.value.filteredData = applyFilter(state.value.data, state.value.filter);
      state.value.loading = false;
    },
    
    // Set Loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.value.loading = action.payload;
    },

    // Set Filter
    setFilter: (state, action: PayloadAction<string>) => {
      const filterType = action.payload;
      state.value.filter = filterType;

      state.value.filteredData = applyFilter(state.value.data, filterType);
    },

    // Set isDone
    setIsDone: (state, action: PayloadAction<{ id: string, isDone: boolean }>) => {
      const { id, isDone } = action.payload;
      const taskIndex = state.value.data.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.value.data[taskIndex].isDone = isDone;
      }

      const currentDate = new Date();
      state.value.data = sortTasks(state.value.data, currentDate);
      state.value.filteredData = applyFilter(state.value.data, state.value.filter);
    },

    // Set Date
    setDate: (state, action: PayloadAction<{ id: string, date: string }>) => {
      const { id, date } = action.payload;
      const taskIndex = state.value.data.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.value.data[taskIndex].date = date;
      }

      const currentDate = new Date();
      state.value.data = sortTasks(state.value.data, currentDate);
      state.value.filteredData = applyFilter(state.value.data, state.value.filter);
    },

    // Set Description
    setDescription: (state, action: PayloadAction<{ id: string, description: string }>) => {
      const { id, description } = action.payload;
      const taskIndex = state.value.data.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.value.data[taskIndex].description = description;
      }

      state.value.filteredData = applyFilter(state.value.data, state.value.filter);
    },

    // Delete Task
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.value.data = state.value.data.filter((task) => task.id !== taskId);

      state.value.filteredData = applyFilter(state.value.data, state.value.filter);
    }
  },
});

export const { setTasks, setLoading, setFilter, setIsDone, setDate, setDescription, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;

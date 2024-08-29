/* eslint-disable react-hooks/exhaustive-deps */
// Libs
import Image from "next/image";
import { useEffect } from "react";

// Components
import Button from "@/components/button/Button";
import FilterTaskButton from "@/components/button/FilterTaskButton";
import TaskList from "@/components/task/TaskList";

// Hooks
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTasks, setLoading, setFilter } from "@/redux/reducers/taskSlice";

// Api
import apiClient from "@/api/apiClient";

// Interface
interface TaskPopupProps {
  isActive?: boolean;
}


export default function TaskPopup(props: TaskPopupProps) {
  // Props
  const { isActive } = props;

  // States
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.value);
  const { data, filteredData, loading } = useAppSelector((state) => state.task.value);

  // Hooks
  useEffect(() => {
    if (isActive && userState.id) {
      if (!loading && data.length === 0) {
        const fetchTasks = async () => {
          dispatch(setLoading(true));
          try {
            const response = await apiClient.get('/tasks/' + userState.id);
            if (response.status === 200 && response.data.status === 'success') {
              // console.log(response.data.data);
              dispatch(setTasks(response.data.data));
              // dispatch(setTasks([...response.data.data, ...response.data.data, ...response.data.data]));
            } else {
              dispatch(setTasks([]));
            }
          } catch (error) {
            dispatch(setTasks([]));
            console.error(error);
          } finally {
            dispatch(setLoading(false));
          }
        };
  
        fetchTasks();
      }
    }
  }, [isActive, userState.id, dispatch, data.length]);

  
  if (!isActive) return null;
  return (
    <div className="relative bg-white h-full w-full rounded-lg overflow-hidden">
      {/* Navigation Bar */}
      <div className="h-[80px] flex justify-between items-center">
        <div className="max-w-[200px] min-w-[140px] w-[10vw] relative flex justify-end">
          <FilterTaskButton />
        </div>
        <div className="mr-5">
          <Button width="130">New Task</Button>
        </div>
      </div>

      {/* Task List */}
      <div className="w-full h-[calc(100%-80px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary-black scrollbar-track-white">
        {filteredData.map((task) => (
          <div key={task.id}>
            <TaskList task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}

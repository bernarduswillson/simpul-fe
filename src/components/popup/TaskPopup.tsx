/* eslint-disable react-hooks/exhaustive-deps */
// Libs
import { useEffect, useRef } from "react";
import lottie from 'lottie-web';

// Assets
import taskLoadingAnimation from "@/assets/animations/task-loading.json";

// Components
import FilterTaskButton from "@/components/button/FilterTaskButton";
import TaskList from "@/components/task/TaskList";
import NewTaskButton from "@/components/button/NewTaskButton";

// Hooks
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTasks, setLoading } from "@/redux/reducers/taskSlice";

// Api
import apiClient from "@/api/apiClient";

// Interface
interface TaskPopupProps {
  isActive?: boolean;
}


export default function TaskPopup(props: TaskPopupProps) {
  // Props
  const { isActive } = props;

  // Lottie Configuration
  const chatLoadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: taskLoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  // States
  const animationContainerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const container = animationContainerRef.current;

    if (loading && container) {
      lottie.loadAnimation({
        ...chatLoadingAnimationOptions,
        container,
      });
    }
  }, [loading]);

  const createTask = async (type: string) => {
    try {
      const newTask = {
        userId: userState.id,
        type,
      };

      const response = await apiClient.post('/tasks', newTask);
      if (response.status === 201 && response.data.status === 'success') {
        dispatch(setTasks([...data, response.data.data]));
      } else {
        console.log("Failed to create task");
      }
    } catch (error) {
      console.error(error);
    }
  }

  
  if (!isActive) return null;
  return (
    <div className="relative bg-white h-full w-full rounded-lg overflow-hidden">
      {/* Navigation Bar */}
      <div className="h-[80px] flex justify-between items-center">
        <div className="max-w-[200px] min-w-[140px] w-[10vw] relative flex justify-end">
          <FilterTaskButton />
        </div>
        <div className="mr-5">
          <NewTaskButton onClick={(type) => createTask(type)} />
        </div>
      </div>

      {/* Task List */}
      <div className={`w-full relative ${loading || data.length === 0 ? 'flex flex-col justify-center items-center h-full translate-y-[-70px]' :'h-[calc(100%-80px)] '} overflow-y-auto scrollbar-thin scrollbar-thumb-primary-black scrollbar-track-white`}>
        {loading ? (
          <div ref={animationContainerRef} className="w-[20%] h-[20%]"></div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[30%] w-[30%]">
            <p className="text-primary-black text-lg font-bold">No Task Found</p>
          </div>
        ) : (
          filteredData.map((task) => (
            <TaskList key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}

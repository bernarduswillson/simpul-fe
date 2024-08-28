// Libs
import Image from "next/image";
import { useEffect } from "react";

// Components
import Button from "@/components/button/Button";
import FilterTaskButton from "@/components/button/FilterTaskButton";
import TaskList from "@/components/task/TaskList";

// Hooks
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setTasks, setFilter } from "@/redux/reducers/taskSlice";


// id
// userId
// name
// date
// description
// type
// isDone
const TODO = [
  {
    id: 1,
    userId: 1,
    name: "Close off Case #012920- RODRIGUES, Amiguel",
    date: "2024-09-24T05:19:00Z",
    description: "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    type: "personal",
    isDone: false,
  },
  {
    id: 2,
    userId: 1,
    name: "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
    date: "2024-09-25T05:19:00Z",
    description: "All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.",
    type: "urgent",
    isDone: false,
  },
  {
    id: 3,
    userId: 1,
    name: "Set up appointment with Dr Blake",
    date: "2024-09-26T05:19:00Z",
    description: "",
    type: "personal",
    isDone: false,
  },
  {
    id: 4,
    userId: 1,
    name: "Contact Mr Caleb - video conference?",
    date: "2024-08-24T05:19:00Z",
    description: "This is a description",
    type: "urgent",
    isDone: true,
  },
  {
    id: 5,
    userId: 1,
    name: "Assign 3 homework to Client A",
    date: "2024-08-10T05:19:00Z",
    description: "This is a description",
    type: "personal",
    isDone: true,
  },
];



export default function TaskPopup() {
  // States
  const dispatch = useAppDispatch();
  const { data, filteredData, loading } = useAppSelector((state) => state.task.value);
  
  // Hooks
  useEffect(() => {
    dispatch(setTasks(TODO));
    dispatch(setFilter("all"));
  }, []);

  
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

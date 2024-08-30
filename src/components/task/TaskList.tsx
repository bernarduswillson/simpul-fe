/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Assets
import chevronDownIcon from "@/assets/icons/chevron-down-ic.svg";
import kebabMenuIcon from "@/assets/icons/kebab-menu-ic.svg";
import scheduleIcon from "@/assets/icons/schedule-ic.svg";
import descriptionIcon from "@/assets/icons/description-ic.svg";
import tagIcon from "@/assets/icons/tag-ic.svg";

// Components
import CalendarButton from "@/components/button/CalendarButton";
import DeleteTaskButton from "@/components/button/DeleteTaskButton";
import Modal from "@/components/dialogue/Modal";
import Button from "@/components/button/Button";

// Hooks
import apiClient from "@/api/apiClient";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setTasks, setLoading, setName, setIsDone, setDate, setDescription, setTags, deleteTask } from '@/redux/reducers/taskSlice';

// Interface
import Task from "@/interfaces/task";
interface TaskListProps {
  task: Task;
}

export default function TaskList(props: TaskListProps) {
  // Props
  const { task } = props;

  // States
  const dispatch = useAppDispatch();
  const [isDropdownVisible, setIsDropdownVisible] = useState(task.isDone ? false : true);
  const filter = useAppSelector((state) => state.task.value.filter);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [isChecked, setIsChecked] = useState(task.isDone);
  const [selectedDate, setSelectedDate] = useState(task.date);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [desc, setDesc] = useState(task.description);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTagModalOpen, setIsAddTagModalOpen] = useState(false);
  const [title, setTitle] = useState(task.name);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tagMap: { [key: string]: { name: string; style: string } } = {
    1: { name: "Important ASAP", style: "bg-stickers-100" },
    2: { name: "Offline Meeting", style: "bg-stickers-200" },
    3: { name: "Virtual Meeting", style: "bg-stickers-300" },
    4: { name: "ASAP", style: "bg-stickers-400" },
    5: { name: "Client Related", style: "bg-stickers-500" },
    6: { name: "Self Task", style: "bg-stickers-600" },
    7: { name: "Appointments", style: "bg-stickers-700" },
  };
  

  const handleDeleteTaskButton = async(type: string) => {
    if (type === "delete") {
      setIsDeleteModalOpen(true);
    }
  }

  const handleDeleteTask = async () => {
    setIsDeleteModalOpen(false);
    try {
      const response = await apiClient.delete(`/tasks/${task.id}`);
      if (response.status === 200 && response.data.status === 'success') {
        dispatch(deleteTask(task.id));
      } else {
        console.log("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Hooks
  useEffect(() => {
    const editDate = async () => {
      try {
        const newDate = {
          date: selectedDate,
        };

        const response = await apiClient.put(`/tasks/${task.id}`, newDate);
        if (response.status === 200 && response.data.status === 'success') {
          dispatch(setDate({ id: task.id, date: selectedDate }));
        } else {
          console.log("Failed to edit date");
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    if (selectedDate !== task.date) {
      editDate();
    }
  }, [selectedDate]);
  
  useEffect(() => {
    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);
    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, [isDropdownVisible, isEditingDesc, filter, task]);


  const updateMaxHeight = (): void => {
    if (dropdownRef.current) {
      setMaxHeight(isDropdownVisible ? `${dropdownRef.current.scrollHeight}px` : "0px");
    }
  };

  const handleDescriptionSubmit = () => {
    setIsEditingDesc(false);
    const editDescription = async () => {
      try {
        const newDescription = {
          description: desc,
        };

        const response = await apiClient.put(`/tasks/${task.id}`, newDescription);
        if (response.status === 200 && response.data.status === 'success') {
          dispatch(setDescription({ id: task.id, description: desc }));
        } else {
          console.log("Failed to edit description");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (desc !== task.description) {
      editDescription();
    }
  };

  const handleCheck = async () => {
    if (task.name === "") return;

    if (!isChecked) {
      setIsDropdownVisible(false);
    }
    setIsChecked(!isChecked);

    try {
      const newStatus = {
        isDone: !isChecked,
      };

      const response = await apiClient.put(`/tasks/${task.id}`, newStatus);
      if (response.status === 200 && response.data.status === 'success') {
        console.log("Task updated");
        dispatch(setIsDone({ id: task.id, isDone: !isChecked }));
      } else {
        console.log("Failed to update task");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleTitleSubmit = async () => {
    if (title === "") return;

    try {
      const newTitle = {
        name: title,
      };

      const response = await apiClient.put(`/tasks/${task.id}`, newTitle);
      if (response.status === 200 && response.data.status === 'success') {
        console.log("Task updated");
        dispatch(setName({ id: task.id, name: title }));
      } else {
        console.log("Failed to update task");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleTagSubmit = async (tag: string) => {
    try {
      setIsAddTagModalOpen(false);
      const isTagActive = task.tags.includes(tag);
      const newTags = isTagActive
        ? { tags: task.tags.filter((existingTag) => existingTag !== tag) }
        : { tags: [...task.tags, tag] };
  
      const response = await apiClient.put(`/tasks/${task.id}`, newTags);    
      if (response.status === 200 && response.data.status === 'success') {
        console.log("Task updated");
        dispatch(setTags({ id: task.id, tags: newTags.tags }));
      } else {
        console.log("Failed to update task");
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  


  const parseDate = (date: string): string => {
    const newDate = new Date(date);

    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const calculateDate = (date: string): string => {
    const newDate = new Date(date);
    const currentDate = new Date();

    const diffTime = newDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";

    if (diffDays < 0) return "Overdue";
    return `${diffDays} Days Left`;
  };

  return (
    <div className="relative flex flex-col border-b-[2px] border-gray-300 px-5 py-3 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex w-full">
          <input
            type="checkbox"
            className="w-[15px] h-[15px] mt-[5px] cursor-pointer"
            checked={isChecked}
            onChange={handleCheck}
          />
          <div className="ml-5 flex-1 cursor-pointer" onClick={handleCheck}>
            { task.name === "" ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
                placeholder="Type Task Title"
                className="flex translate-y-[-6px] w-full border-2 border-gray-400 rounded-md p-2 lato-bold text-black leading-[18px] hover:border-primary-blue transition-all duration-200"
              />
            ) : (
              <p
                className={`lato-bold text-black transition-all duration-300 ${isChecked ? "line-through text-gray-500" : ""}`}
              >
                {task.name}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-start justify-end w-[80px] md:w-[450px]">
          <p className={`lato-bold text-indicator-red text-md hidden md:block transition-all duration-300 mt-[2px] ${isChecked || selectedDate === "" ? 'opacity-0' : 'opacity-100'}`}>{calculateDate(task.date)}</p>
          <p className={`lato-regular text-black ml-5 text-md hidden md:block mt-[2px] ${selectedDate === "" ? 'opacity-0' : 'opacity-100'}`}>{parseDate(task.date)}</p>
          <Image
            src={chevronDownIcon}
            alt="Chevron Down Icon"
            width={13}
            height={13}
            className={`ml-5 mt-[6px] cursor-pointer transition-transform duration-300 ${isDropdownVisible ? 'rotate-0' : 'rotate-180'}`}
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          />
          <div className={`w-7 h-7 translate-x-[12px] transition-all duration-300 ${isDropdownVisible ? 'opacity-100' : 'opacity-0'}`}>
            <DeleteTaskButton onClick={(type) => handleDeleteTaskButton(type)} />
          </div>
        </div>
      </div>

      {/* Dropdown Content */}
      <div
        ref={dropdownRef}
        className={`transition-max-height ml-0 sm:ml-9 duration-500 ease-in-out ${isDropdownVisible ? 'mt-3' : 'mt-0'}`}
        style={{ maxHeight }}
      >

        {/* Date */}
        <div className="flex items-center mt-3">
          <Image src={scheduleIcon} alt="Schedule Icon" width={17} height={17} />
          <CalendarButton date={selectedDate} onDateSelect={(date) => setSelectedDate(date)} />
        </div>

        {/* Description */}
        <div className="flex items-start mt-3">
          <Image src={descriptionIcon} alt="Description Icon" width={17} height={17} className="translate-y-[4px]"/>
          {isEditingDesc ? (
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onBlur={handleDescriptionSubmit}
              onKeyDown={(e) => e.key === "Enter" && handleDescriptionSubmit()}
              className="lato-regular text-primary-black leading-[18px] ml-5 mr-2 p-1 w-full resize-none overflow-hidden bg-white focus:text-black"
              autoFocus
              rows={3}
            />
          ) : (
            <p 
              className="lato-regular text-primary-black leading-[18px] ml-5 mr-2 p-1 cursor-pointer hover:text-primary-blue transition-all duration-200 w-full"
              onClick={() => setIsEditingDesc(true)}
            >
              {desc === "" ? "No Description" : desc}
            </p>
          )}
        </div>

        {/* Tags */}
        <div className="flex mt-3 w-full translate-x-[-8px] min-h-[54px] cursor-pointer hover:opacity-70 transition-all duration-200" onClick={() => setIsAddTagModalOpen(true)}>
          <div className="bg-primary-white rounded-l-lg p-[10px]">
            <Image
              src={tagIcon}
              alt="Tag Icon"
              width={17}
              height={17}
              className="mt-[6px]"
            />
          </div>
          <div className="flex flex-wrap gap-3 bg-primary-white rounded-r-lg w-full p-2">
            {task.tags.map(tagId => (
              <div key={tagId} className={`lato-bold text-md text-primary-black px-4 py-2 rounded-md ${tagMap[tagId].style}`}>
                {tagMap[tagId].name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal onClose={() => setIsDeleteModalOpen(false)} isOpen={isDeleteModalOpen}>
        <h2 className="mb-1 text-black lato-bold header-3 text-center">
          Delete
        </h2>
        <p className="mb-7 text-gray-500 lato-regular body-m text-center">
          Are you sure you want to delete this task?
        </p>
        <div>
          <div className='flex gap-7'>
            <Button
              variant="warning"
              width='120'
              onClick={() => handleDeleteTask()}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              width='120'
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Tag Modal */}
      <Modal onClose={() => setIsAddTagModalOpen(false)} isOpen={isAddTagModalOpen} width="300px">
      <div className="w-full flex flex-col gap-[10px] -mt-5">
        {Object.keys(tagMap).map((key) => (
          <div
            key={key}
            className={`lato-bold text-md px-4 py-[5px] rounded-md cursor-pointer text-primary-black hover:opacity-50 transition-all duration-300 ${
              task.tags.includes(key)
                ? 'border-primary-blue border-[2px]'
                : ''
            } ${tagMap[key].style}`}
            onClick={() => handleTagSubmit(key)}
          >
            {tagMap[key].name}
          </div>
        ))}
      </div>
    </Modal>
    </div>
  );
}

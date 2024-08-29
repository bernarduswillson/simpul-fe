/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Assets
import chevronDownIcon from "@/assets/icons/chevron-down-ic.svg";
import kebabMenuIcon from "@/assets/icons/kebab-menu-ic.svg";
import scheduleIcon from "@/assets/icons/schedule-ic.svg";
import descriptionIcon from "@/assets/icons/description-ic.svg";

// Components
import CalendarButton from "@/components/button/CalendarButton";

// Hooks
import apiClient from "@/api/apiClient";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setTasks, setLoading, setDate, setDescription } from '@/redux/reducers/taskSlice';

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
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(task.description);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          console.log("Failed to read messages");
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
  }, [isDropdownVisible, isEditing, filter]);


  const updateMaxHeight = (): void => {
    if (dropdownRef.current) {
      setMaxHeight(isDropdownVisible ? `${dropdownRef.current.scrollHeight}px` : "0px");
    }
  };

  const handleDescriptionSubmit = () => {
    setIsEditing(false);
    const editDescription = async () => {
      try {
        const newDescription = {
          description: desc,
        };

        const response = await apiClient.put(`/tasks/${task.id}`, newDescription);
        if (response.status === 200 && response.data.status === 'success') {
          dispatch(setDescription({ id: task.id, description: desc }));
        } else {
          console.log("Failed to read messages");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (desc !== task.description) {
      editDescription();
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
            onChange={() => setIsChecked(!isChecked)}
          />
          <div className="ml-5 flex-1 cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
            <p
              className={`lato-bold text-black transition-all duration-300 ${isChecked ? "line-through text-gray-500" : ""}`}
            >
              {task.name}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-end w-[80px] md:w-[450px]">
          <p className={`lato-bold text-indicator-red text-md hidden md:block transition-all duration-300 mt-[2px] ${isChecked ? 'opacity-0' : 'opacity-100'}`}>{calculateDate(task.date)}</p>
          <p className="lato-regular text-black ml-5 text-md hidden md:block mt-[2px]">{parseDate(task.date)}</p>
          <Image
            src={chevronDownIcon}
            alt="Chevron Down Icon"
            width={13}
            height={13}
            className={`ml-5 mt-[6px] cursor-pointer transition-transform duration-300 ${isDropdownVisible ? 'rotate-0' : 'rotate-180'}`}
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          />
          <Image
            src={kebabMenuIcon}
            alt="Kebab Menu Icon"
            width={13}
            height={13}
            className="ml-5 mt-[10px] cursor-pointer"
          />
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
          <Image src={descriptionIcon} alt="Description Icon" width={17} height={17} />
          {isEditing ? (
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onBlur={handleDescriptionSubmit}
              onKeyDown={(e) => e.key === "Enter" && handleDescriptionSubmit()}
              className="lato-regular text-primary-black leading-[18px] ml-5 p-1 w-full resize-none overflow-hidden bg-white focus:text-black"
              autoFocus
              rows={3}
            />
          ) : (
            <p className="lato-regular text-primary-black leading-[18px] ml-5 p-1 cursor-pointer" onClick={() => setIsEditing(true)}>
              {desc === "" ? "No Description" : desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

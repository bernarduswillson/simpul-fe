import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Assets
import chevronDownIcon from "@/assets/icons/chevron-down.svg";
import kebabMenuIcon from "@/assets/icons/kebab-menu-ic.svg";
import calendarIcon from "@/assets/icons/calendar-ic.svg";
import scheduleIcon from "@/assets/icons/schedule-ic.svg";
import descriptionIcon from "@/assets/icons/description-ic.svg";

// Interface
import Task from "@/interfaces/task";
interface TaskListProps {
  task: Task;
}

export default function TaskList(props: TaskListProps) {
  // Props
  const { task } = props;

  // States
  const [isDropdownVisible, setIsDropdownVisible] = useState(task.isDone ? false : true);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [isChecked, setIsChecked] = useState(task.isDone);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hooks
  useEffect(() => {
    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);
    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, [isDropdownVisible]);

  const updateMaxHeight = (): void => {
    if (dropdownRef.current) {
      setMaxHeight(isDropdownVisible ? `${dropdownRef.current.scrollHeight}px` : "0px");
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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="relative flex flex-col border-b-[2px] border-gray-300 px-5 pt-3 pb-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex w-full">
          <input
            type="checkbox"
            className="w-[15px] h-[15px] mt-[5px] cursor-pointer"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="ml-5 flex-1">
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
        className={`transition-max-height ml-0 sm:ml-9 duration-500 ease-in-out overflow-hidden ${isDropdownVisible ? 'mt-3' : 'mt-0'}`}
        style={{ maxHeight }}
      >
        <div className="flex items-center mt-3">
          <Image src={scheduleIcon} alt="Schedule Icon" width={17} height={17} />
          <button
            className="flex border-2 border-gray-400 rounded-md p-2 lato-regular text-black leading-[18px] ml-5"
            onClick={() => {}}
          >
            {parseDate(task.date)}

            <Image src={calendarIcon} alt="Calendar Icon" width={17} height={17} className="ml-14" />
          </button>
        </div>

        <div className="flex items-start mt-3">
          <Image src={descriptionIcon} alt="Description Icon" width={17} height={17} />
          <p className="lato-regular text-primary-black leading-[18px] ml-5">
            {task.description === "" ? "No Description" : task.description}
          </p>
        </div>
      </div>
    </div>
  );
}

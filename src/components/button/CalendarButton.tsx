// Libs
import { useState } from "react";
import Image from "next/image";

// Assets
import calendarIcon from "@/assets/icons/calendar-ic.svg";

// Components
import Calendar from "@/components/input/Calendar";

// Utils
import { formatDate1 } from "@/utils/date";

// Interface
interface CalendarButtonProps {
  date: string;
  onDateSelect?: (date: string) => void;
}


export default function CalendarButton(props: CalendarButtonProps) {
  // Props
  const { date, onDateSelect } = props;

  // States
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  
  return (
    <div className="relative">
      {/* Button */}
      <button
        className="flex border-2 border-gray-400 rounded-md p-2 lato-regular text-primary-black leading-[18px] ml-5 hover:border-primary-blue transition-all duration-200"
        onClick={() => setIsCalendarVisible(!isCalendarVisible)}
      >
        {formatDate1(date)}

        <Image src={calendarIcon} alt="Calendar Icon" width={17} height={17} className="ml-14" />
      </button>

      {/* Calendar */}
      <Calendar date={date} isOpen={isCalendarVisible} onClose={() => setIsCalendarVisible(false)} onDateSelect={(date) => onDateSelect && onDateSelect(new Date(date).toISOString())} />
    </div>
  );
}

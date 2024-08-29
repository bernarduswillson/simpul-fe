import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

import chevronDownIcon from '@/assets/icons/chevron-down-ic.svg';

interface CalendarProps {
  date: string;
  isOpen: boolean;
  onClose: () => void;
  onDateSelect?: (date: Date) => void;
  startWeekOnSunday?: boolean;
  primaryColor?: string;
  todayColor?: string;
}

export default function Calendar(props: CalendarProps) {
  const { date, isOpen, onClose, onDateSelect, startWeekOnSunday = true, primaryColor = 'text-black', todayColor = 'bg-gray-200' } = props;

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(date));

  const initialDate = selectedDate || new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate);
    } else {
      setCurrentDate(new Date());
    }
  }, [selectedDate]);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-4 py-2 ml-[-13px] rounded hover:bg-gray-200 transition-all duration-300">
          <Image src={chevronDownIcon} alt="Chevron Down Icon" width={10} height={10} className="rotate-90"/>
        </button>
        <div className="text-lg lato-bold">{format(currentDate, dateFormat)}</div>
        <button onClick={nextMonth} className="px-4 py-2 mr-[-13px] rounded hover:bg-gray-200 transition-all duration-300">
          <Image src={chevronDownIcon} alt="Chevron Down Icon" width={10} height={10} className="-rotate-90" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEEE';
    const startDate = startOfWeek(currentDate, { weekStartsOn: startWeekOnSunday ? 0 : 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-sm font-semibold">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2 lato-bold">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart, { weekStartsOn: startWeekOnSunday ? 0 : 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: startWeekOnSunday ? 0 : 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        days.push(
          <div
            key={day.toString()}
            className={`text-center cursor-pointer py-[3px] lato-regular rounded-full text-[14px] ${primaryColor} ${
              !isCurrentMonth ? 'text-gray-400 pointer-events-none' : 'hover:bg-primary-white'
            } ${isSameDay(day, new Date()) ? todayColor : ''} ${
              isSameDay(day, selectedDate || new Date()) ? 'border-[1px] border-primary-blue rounded-full' : ''
            }`}
            onClick={isCurrentMonth ? () => onDateClick(cloneDay) : undefined}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    onDateSelect && onDateSelect(day);
    onClose();
  };

  const nextMonth = () => {
    setCurrentDate(addDays(currentDate, 30));
  };

  const prevMonth = () => {
    setCurrentDate(addDays(currentDate, -30));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-50 backdrop-blur inset-0 flex items-center justify-center bg-scrim rounded-xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.2 }
          }}
        >
          <div className="fixed w-full h-full inset-0" onClick={onClose} />

          <motion.div
            className="p-4 w-[240px] mx-auto bg-white rounded-lg border-primary-gray border-[2px] z-50"
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{
              scale: 1,
              rotate: '0deg',
              transition: { duration: 0.3, ease: 'backOut' }
            }}
            exit={{
              scale: 0,
              rotate: '0deg',
              transition: { duration: 0.3, ease: 'backIn' }
            }}
          >
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

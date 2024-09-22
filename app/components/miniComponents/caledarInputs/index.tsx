"use client"
import React,{useState,ChangeEvent,useEffect, useCallback} from "react";
import DatePickerComponent from "../datePicker";

interface Props {
    scheduleData:(index:number, selectedNumber:number, startDate:Date| null, endDate: Date | null, scheduleName:string) => void
    error:boolean
    index:number
}
const CalendarInputs = ({scheduleData, error,index}: Props)  =>{
    const [selectedNumber, setSelectedNumber] = useState<number>(1);
    const [startDate, setStartDate] = useState<Date | null>(new Date())
    const [endDate, setEndDate] = useState<Date | null>(new Date())
    const [scheduleName, setScheduleName] = useState<string>("")

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.target.value, 10);
      setSelectedNumber(value);
    };

    const handleNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setScheduleName(ev.target.value)
    }
      
 // Memoize the scheduleData function using useCallback
 const memoizedScheduleData = useCallback(() => {
    scheduleData(index, selectedNumber, startDate, endDate, scheduleName);
  }, [index, selectedNumber, startDate, endDate, scheduleName, scheduleData]); // Add dependencies here

  // useEffect that triggers the memoizedScheduleData function when dependencies change
  useEffect(() => {
    memoizedScheduleData(); // Call the memoized function
  }, [memoizedScheduleData, scheduleData]); // Use the memoized function as a dependency

    return (
      <>
      <div className="block lg:flex gap-4">
        <div className="block sm:flex sm:gap-4">
        <div className="block sn:flex flex-col items-center">
            <h1 className="capitalize text-sm sm:text-base">week</h1>
            <select
                className="p-1 sm:p-2 border border-gray-300 rounded-full text-xs sm:text-base"
                value={selectedNumber}
                onChange={handleChange}
            >
                {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                    {num}
                </option>
                ))}
            </select>
        </div>
        <div className="flex flex-col">
         <h1 className="capitalize text-sm sm:text-base">duration</h1>
         <div className="flex gap-2 items-center">
            <p className="capitalize text-sm sm:text-base self-start mt-2 justify-self-center">from:</p>
            <DatePickerComponent onChange={(date: Date | null) => setStartDate(date)} selected={startDate} className="text-xs sm:text-base self-end"/>
            <p className="capitalize text-sm sm:text-base self-start mt-2">to:</p>
            <DatePickerComponent onChange={(date: Date | null) => setEndDate(date)} selected={endDate} className="text-xs sm:text-base self-end"/>
         </div>
         </div>
        </div>
        <div className="sm:block">
            <div className="flex flex-col w-full">
                <h1 className="capitalize text-sm sm:text-base">schedule Name</h1>
                <input type="text" value={scheduleName}  
                placeholder={error ? "fill this field" : "input the school schedule title"}
                className="text-sm sm:text-base"
                onChange={(ev) => handleNameChange(ev)}/>
            </div>
        </div>
      </div>
      </>
    )
}

export default CalendarInputs;

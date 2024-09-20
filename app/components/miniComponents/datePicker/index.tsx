"use client"
import React, {useState} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

interface Props{
    onChange: (_:Date | null) => void;
    selected: Date | null;
    className?: string
}
const DatePickerComponent = ({onChange,selected,className} : Props) => {
    return(
        <div className={`${className}`}>
            <DatePicker 
            selected={selected}
            onChange={onChange} 
            dateFormat="yyyy/MM/dd"
            />
        </div>
    )
}
export default DatePickerComponent;
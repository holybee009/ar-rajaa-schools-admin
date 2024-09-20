"use client"
import react from "react"

interface Props {
    weekNumber: number,
   startDate: string,
   endDate: string,
    scheduleName: string,
}
const CalendarBlock = ({weekNumber,startDate,endDate,scheduleName}: Props) => {
    return (
        <>
        <div className="flex justify-between gap-3">
            <p className="capitalize text-xs sm:text-base min-w-fit">week <span>{weekNumber}</span></p>
            <div className="block text-center sm:flex text-xs sm:text-sm gap-1">
                <p className="capitalize min-w-fit">{startDate} -</p>
                <p className="capitalize min-w-fit">{endDate}</p>
            </div>
            <p className="capitalize text-xs sm:text-base min-w-fit font-bold">{scheduleName}</p>
        </div>
        </>
    )
}
export default CalendarBlock;
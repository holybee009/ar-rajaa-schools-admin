"use client"
import react,{useState} from "react"
import CalendarInputs from "../../miniComponents/caledarInputs"
import Button from "../../atoms/button"
import axios from "axios"
import { API_BASE_URL } from "@/config"
import './CustomScrollbar.css';

interface CalendarBlock {
    selectedNumber: number,
    startDate: Date | null,
    endDate:  Date | null,
    scheduleName: string
}

const AddCalender = () =>{
    const [newChildren, setNewChildren] = useState<number[]>([1]);
    const [eachData, setEachData] = useState<CalendarBlock>()
    const [calendarError, setCalendarError] = useState<boolean>(false) 
    const [message, setMessage] = useState('');
    const [calendarData, setCalendarData] = useState<CalendarBlock[]>([{selectedNumber: 0,startDate:null, endDate:null, scheduleName:""}])
    
     // session determination handler
  const currentYear: number = new Date().getFullYear(); // Get the current year
  const [selectedYear, setSelectedYear] = useState<string>(`${currentYear}/${currentYear + 1}`);
 
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };
 
  // Generate an array of academic years (e.g., 2000/2001 to currentYear/currentYear + 1)
  const generateAcademicYears = (startYear: number): string[] => {
    const academicYears: string[] = [];
    for (let year = startYear; year <= currentYear; year++) {
      academicYears.push(`${year}/${year + 1}`);
    }
    return academicYears;
  };
 
  const academicYears: string[] = generateAcademicYears(2000); // Start from the year 2000

    // setting the calendar data array
    const scheduleData = (index:number, selectedNumber:number, startDate:Date| null, endDate: Date | null, scheduleName:string) =>{
        setEachData({selectedNumber,startDate,endDate,scheduleName})
        setCalendarData((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = { selectedNumber,startDate, endDate, scheduleName  };
            return updatedValues;
          });    
    }

    // add new child component
    const addNewChild = () => {
        if (eachData === undefined){
            setCalendarError(true)
        } else if ( eachData !== undefined ) {
            if(eachData.scheduleName === "") {
                setCalendarError(true)
            } else {
                setNewChildren([...newChildren, newChildren.length + 1]); // Add a new child based on the current length of the array
                setCalendarData([...calendarData, { selectedNumber: 0,startDate:null, endDate:null, scheduleName:"" }]);  
            }
        }
      };

      console.log(calendarData);
      
    //   post school calendar
    const addSchoolCalendar = async () =>{

        try{
            const response = await axios.post(`${API_BASE_URL}/calendar`, {selectedYear, calendarData})
            console.log(response.data)
                // Handle successful response
            setMessage(response.data);
            } catch (error: any) {
            // Handle error
            if (error.response) {
                // Server responded with a status other than 200 range
                setMessage(error.response.data.message);
            } else {
                // Something else happened while setting up the request
                setMessage('Failed to upload calendar');
            }
            } finally {
                setCalendarData([{selectedNumber: 0,startDate:null, endDate:null, scheduleName:""}])
            }
    }
      
    return(
        <>
        <div>
        <div className="text-center capitalize underline mb-2">
            <select id="academicYear" value={selectedYear} onChange={handleYearChange}>
              {academicYears.map((academicYear) => (
                <option key={academicYear} value={academicYear}>
                  {academicYear}
                </option>
              ))}
            </select>
            <span> academic session</span>
        </div>
        <div className="w-full h-mobileScroll sm:h-64 p-4 overflow-y-auto custom-scrollbar">
          {newChildren.map((child, index) => (
            <CalendarInputs key={index} index={index} scheduleData={scheduleData} error={calendarError}/>
          ))}
        </div>
      </div>
        <Button href="#" text="add new schedule" className="capitalize cursor-pointer border-[#00000080]"
            color="#000"       // Black text color
            bgColor="#fff" onClick={addNewChild}/>
        {message && <div className="mt-4 text-red-500">{message}</div>}
        <Button href="#" text="add school calendar" className="absolute bottom-3 w-full inset-x-0" onClick={addSchoolCalendar}/>
        </>
    )
}

export default AddCalender;

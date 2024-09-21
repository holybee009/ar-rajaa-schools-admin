"use client"
import react, {useState} from "react"
import AcademicSessions from "../../miniComponents/academicSessions";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import CalendarBlock from "../../miniComponents/calendarBlock";
import Button from "../../atoms/button";
import Modal from "../../miniComponents/modal";

interface Data{
    _id:string
    selectedNumber: number,
    startDate:string, 
    endDate:string, 
    scheduleName:string
}

const CalendarData = () => {
    const [calendarDisplay, setCalendarDisplay] = useState<boolean>(false)
    const [results, setResults] = useState<any[]>([]); // To store search results
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")


    // show calenders
    const showCalendar = async (val:string) =>{
        setCalendarDisplay(true)
        try {
            const response = await axios.get(`${API_BASE_URL}/calendar`, {
              params: { selectedYear : val},
            });
            setResults(response.data);
          }  catch (error) {
              if (axios.isAxiosError(error)) {
                      // Type guard: error is an instance of AxiosError
               setError(error.message);
               } else {
                      // Handle other types of errors
               setError("An unknown error occurred");
              }
            } finally {
            setLoading(false);
           }
    }

        // for getting the desired date format
        const getFormattedDate = (value:string) =>{
            const isoDateString: string = value;
            const date: Date = new Date(isoDateString);
            
            // Function to get the ordinal suffix for the day
            const getOrdinalSuffix = (day: number): string => {
              if (day > 3 && day < 21) return 'th'; // 11th, 12th, 13th, etc.
              switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
              }
            };
            
            const day: number = date.getDate();
            const month: string = date.toLocaleString('default', { month: 'long' });
            const year: number = date.getFullYear();
            
            const formattedDate: string = `${day}${getOrdinalSuffix(day)}, ${month} ${year}`;
            return formattedDate;   
        }

        const goBack = () =>{
            setCalendarDisplay(!calendarDisplay)
        }


        //   set delete authentication to true
    const deletecalendar = () => {
        if(results.length < 0) {
            return
        } else {
           const val = results[0]._id
            setValue(val)
            setDeleteConfirmation(true)
        }
        
      }


        // delete post
    const deletePost = async (value: string) => {
        try {
          const response = await axios.delete(`${API_BASE_URL}/calendar` + value)
          alert(response.data.message);
        }  catch (error) {
          if (axios.isAxiosError(error)) {
              console.error('error deleting post', error.response 
                ? error.response.data : error.message)
          } else {
            // Non-Axios error
            console.error('Error:', error);
            alert('An unexpected error occurred.');
          }
        }
        setDeleteConfirmation(false)
      }


    return (
        <>
        {calendarDisplay ? <div>
              {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) :  results.length > 0 ? 
      (
        <div className="mt-2">
        {
        results[0].calendarData.map((data:Data) =>
                 <CalendarBlock 
                    key={data._id}
                    weekNumber={data.selectedNumber}
                    scheduleName={data.scheduleName}
                    startDate={getFormattedDate(data.startDate)}
                    endDate={getFormattedDate(data.endDate)}
                  />
            )
        }
        <div className="flex absolute gap-3  w-full bottom-4 inset-x-0">
            <Button href="#" text="delete" className="full" onClick={deletecalendar}/>
            <Button href="#" text="back" className="w-full"  onClick={goBack}/>
        </div>
        {<Modal show={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
        <div>
          <p className="text-center">Are you sure you want to delete this post?</p>
          <p className="text-center mb-6 text-sm text-[#EE3A57]">This action cannot be undone!!!</p>
          <div className="flex justify-between gap-20">
            <Button href="#" text="cancel"  className="capitalize cursor-pointer border-[#00000080]"
            color="#000"       // Black text color
            bgColor="#fff"   onClick={() => setDeleteConfirmation(false)}/>
            <Button href="#" text="delete" className="capitalize cursor-pointer w-3/4" onClick={() => deletePost(value)}/>
          </div>
        </div>
        </Modal>
      }
        </div>
      ) : (
        <p>No calendar yet</p>
      )}
        </div> :  <AcademicSessions showClasses={showCalendar} textTitle="school calendars"/>}
       
        </>
    )
}

export default CalendarData;

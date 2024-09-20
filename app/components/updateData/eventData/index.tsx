'use client'
import react, {useEffect, useState} from "react"
import EventBlock from "../../miniComponents/eventBlock";
import {API_BASE_URL} from "@/config"
import axios from "axios"
import Modal from "../../miniComponents/modal";
import Button from "../../atoms/button";

interface Event {
    _id: string;
    eventVenue: string;
    eventName: string;
    date: string;
  }

  interface Props{
    onData:(val: string) => void;
    reloadEvent: boolean;
  }
const EventData = ({onData, reloadEvent}: Props) =>{
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [updated, setUpdated] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Event[]>([]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`${API_BASE_URL}/event`);
          setData(response.data);
        } catch (error) {
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
      };
    useEffect(()=>{
        fetchData()
    },[updated === true || reloadEvent === true])

    //displaying the delete confirmation
    const deletePost = (val:string) => {
      setValue(val)
      setDeleteConfirmation(true)
    }

    //sending the id of the post to edit to the event page component
    const editEvent = (val:string) => {
      onData(val)
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


    // for deleting an event post
    const deleteEventPost = async (value: string) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/event` + value)
        alert(response.data.message);
        setUpdated(true)
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
        <div className="flex flex-col justify-center">
            <div className="rounded-full flex justify-between shadow shadow-lg py-2 px-5 pr-12 bg-white">
                <p className="capitalize">events</p>
                <p className="capitalize">venue</p>
                <p className="capitalize">date</p>
            </div>
            <div className="mt-4 text-center rounded-xl p-3 shadow shadow-sm overflow-hidden bg-white">
            {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : data.length > 0 ? (
        data.slice().reverse().map((datas) => (
            <EventBlock 
            key={datas._id}
            event={datas.eventName}
            venue={datas.eventVenue}
            date={getFormattedDate(datas.date)}
            onDeleteEventClick={() => deletePost(datas._id)}
            onEditEventClick={() => editEvent(datas._id)}
            />
        ))
      ) : (
        <p>No post yet</p>
      )}
            </div>
    {<Modal show={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
        <div>
          <p className="text-center">Are you sure you want to delete this post?</p>
          <p className="text-center mb-6 text-sm text-[#EE3A57]">This action cannot be undone!!!</p>
          <div className="flex justify-between gap-20">
            <Button href="#" children="cancel"  className="capitalize cursor-pointer border-[#00000080]"
            color="#000"       // Black text color
            bgColor="#fff"  onClick={() => setDeleteConfirmation(false)}/>
            <Button href="#" children="delete" className="capitalize cursor-pointer w-3/4" onClick={() => deleteEventPost(value)}/>
          </div>
        </div>
      </Modal>
      } 
        </div>
    )
}
 
export default EventData;
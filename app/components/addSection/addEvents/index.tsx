import React,{useState, useEffect} from "react";
import Button from "../../atoms/button";
import DatePickerComponent from "../../miniComponents/datePicker";
import axios, {AxiosError} from "axios"
import { API_BASE_URL } from "@/config";

interface inputType {
  eventName: string;
  eventVenue: string;
}
interface errorType {
  status: boolean;
  message: string;
}
interface Props {
  editEventId: string;
  updateUI: () => void;
}
const AddEvents = ({editEventId, updateUI}: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [eventsInputs, setEventsInputs] = useState<inputType>({eventName:"",eventVenue: ""})
  const [firstError, setFirstError] = useState<errorType>({status:false,message:""})
  const [secondError, setSecondError] = useState<errorType>({status:false,message:""})
  
  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    key: keyof inputType
  ) => {
    const value = ev.target.value;
    setEventsInputs((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

const submitEventInfo = async () =>{
const eventDetails = {...eventsInputs, startDate}
if (eventsInputs.eventName === ""){
  setFirstError({status:true ,message:"this field is required"})
} else if (eventsInputs.eventVenue === ""){
  setSecondError({status: true,message:"this field is required"})
} else {
  try {
    if (editEventId !== ""){
      const response = await axios.put(`${API_BASE_URL}/event`, { editEventId, ...eventDetails });
      alert(response.data);
      updateUI()
    } else {
      const res = await axios.post(`${API_BASE_URL}/event`, eventDetails)
      alert(res.data)
      updateUI()
    }
  } catch (error) {
    // Type assertion to AxiosError
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // Server responded with a status code that falls out of the range of 2xx
      console.log(axiosError.response.data);
      alert(axiosError.response.data);
    } else if (axiosError.request) {
      // Request was made but no response was received
      console.log(axiosError.request);
      alert("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an error
      console.log('Error', axiosError.message);
      alert(axiosError.message);
    } 
  } finally {
    setEventsInputs({ eventName: "", eventVenue: "" });
  }
}
}

useEffect(()=>{setEventsInputs({
  eventName: "",eventVenue:""
})},[])

useEffect(() => {
  if (!editEventId){
    return
  }
  axios.get(`${API_BASE_URL}/event` + editEventId).then(response => {
    const {data} = response;
    console.log(data)
    setEventsInputs({eventName: data?.eventName, eventVenue: data?.eventVenue})
    setStartDate(data.date)
  })
},[editEventId !== ""])

  return (
    <div>
      <p className="capitalize">event name</p>
      <input type="text" placeholder={firstError.status === true ? firstError.message : "event title"} 
      value={eventsInputs.eventName} 
      onChange={(ev) => handleChange(ev, "eventName")}/>
      <p className="capitalize">event venue</p>
      <input type="text" placeholder={secondError.status === true ? secondError.message : "event venue"}  
      value={eventsInputs.eventVenue} 
      onChange={(ev) => handleChange(ev, "eventVenue")}/>
      <p className="capitalize">event date</p>
      <DatePickerComponent onChange={(date: Date | null) => setStartDate(date)} selected={startDate}/>
      <Button children={editEventId === "" ? "add event" : "update event"} href="#" onClick={submitEventInfo}/>
    </div>
  );
};

export default AddEvents;

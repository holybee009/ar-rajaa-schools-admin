"use client";
import React, { useState, useEffect } from "react";
import Upload from "../../atoms/upload";
import Button from "../../atoms/button";
import axios from "axios";
import Image from "next/image";
import Delete from "../../atoms/icons/delete.svg"
import { API_BASE_URL } from "@/config";

interface Error {
  first:boolean;
  second:boolean;
}
interface Props {
  editRecentId: string;
  updateUI: () => void;
}
const AddRecent = ({editRecentId,updateUI}: Props) => {
  const [activity, setActivity] = useState<string>("");
  const [activityPhotos, setActivityPhotos] = useState<string[]>([])
  const [error, setError] = useState<Error>({first:false,second:false});

 
  const uploadFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    const data = new FormData()
   if(files){ for(let i = 0 ; i < files.length; i++){
    data.append('photos',files[i])
   };}
   axios.post(`${API_BASE_URL}/upload-activities`, data, {
    headers: {"Content-Type":"multipart/form-data"}
   }).then(res => {
    const {data: filename} = res
    setActivityPhotos(
      prev => {
        return [...prev, ...filename]}
    )
    console.log(activityPhotos)
    // setMessage(message)
})
  };
  const handleSubmit = async () => {
    const RecentInfo = {activity, activityPhotos}
    console.log(RecentInfo)
   if (activity === ""){
    setError({first: true, second:false})
   } else if (activityPhotos.length === 0) {
    setError({first:false, second:true})
   } else {
    try {
      if (editRecentId !== "") {
        // Editing news information
       const response = await axios.put(`${API_BASE_URL}/activities`, { editRecentId, ...RecentInfo });
       alert(response.data);
       updateUI()
      } else {
        // Posting news information
        await axios.post(`${API_BASE_URL}/activities`, RecentInfo);
        updateUI()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (error.response) {
          // Server responded with a status code that falls out of the range of 2xx
          console.error('Server Error:', error.response.data);
          alert(`Server Error: ${error.response.data}`);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Network Error:', error.request);
          alert('Network Error: No response received from server');
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Error', error.message);
          alert(`Error: ${error.message}`);
        }
      } else {
        // Non-Axios error
        console.error('Error:', error);
        alert('An unexpected error occurred.');
      }
    } finally {
      setActivity("");
      setActivityPhotos([]);
    }
   }
  }

  useEffect(() => {
    if (!editRecentId) {
      return;
    }
  
    axios.get(`${API_BASE_URL}/activities` + editRecentId).then((response) => {
      const { data } = response;
      setActivity(data.activity);
      setActivityPhotos(data.activityPhotos);
    });
  }, [editRecentId, setActivity, setActivityPhotos]); // Add missing dependencies
  

  const removePhoto =(value:string)=>{
    setActivityPhotos([...activityPhotos.filter(photo => photo !== value)])
  }
  return (
    <>
      <div>
        <h1 className="capitalize">activity caption:</h1>
        <input
          type="text"
          placeholder={error.first ? "this field is required" : "activity title"}
          value={activity}
          onChange={(ev) => setActivity(ev.target.value)}
        />
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          <Upload uploadFile={uploadFile} isMultiple={true}/>
          {error.second ? <p>This field is required</p> : activityPhotos.length > 0 && activityPhotos.map(link => 
            <div className="relative w-full h-24"  key={link}> 
            <Image
                src={link}
                alt="Description"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                layout="fill"
                objectFit="cover"  // Use Tailwind's utility class for object-fit
                className="absolute inset-0 rounded-xl"
            />
            <Image src={Delete} alt="delete" width={28} height={28} className="absolute bottom-0.5 bg-[#fff] bg-opacity-60 shadow-sm shadow-black rounded-full right-0.5 p-1.5" onClick={()=>removePhoto(link)}/>
          </div>
          )}
        </div>
        {/* {message && <p>{message}</p>} */}
        <Button
          href="#"
          text={editRecentId !== "" ? "update activity" : "add activity"}
          className="border-none mt-3"
          onClick={() => handleSubmit()}
        />
      </div>
    </>
  );
};

export default AddRecent;

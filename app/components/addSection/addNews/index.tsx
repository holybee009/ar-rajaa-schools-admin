"use client";
import React, { useEffect, useState } from "react";
import Upload from "../../atoms/upload";
import Button from "../../atoms/button";
import Modal from "../../miniComponents/modal";
import Preview from "../../miniComponents/preview";
import axios, {AxiosError} from "axios";
import Image from "next/image";
import DatePickerComponent from "../../miniComponents/datePicker";
import { API_BASE_URL } from "@/config";

interface logs {
  title: string;
  content: string;
}
interface Props {
  editId: string;
  updateUI: () => void
}

const AddNews = ({editId , updateUI}: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newsData, setNewsData] = useState({ title: "", content: "" });
  const [addedPhotos, setAddedPhotos] = useState<string>("")
  const [firstMessage, setFirstMessage] = useState<string>("");
  const [secondMessage, setSecondMessage] = useState<string>("");
  const [thirdMessage, setThirdMessage] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date())


  // input updating handler
  const handleNewsChange = (
    ev:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    key: keyof logs
  ) => {
    const value = ev.target.value;
    setNewsData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


// uploading news photo
  const uploadFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    const formData = new FormData();
    if(files){ for(let i = 0 ; i < files.length; i++){
      formData.append('news-photo',files[i])
     };}

     axios.post(`${API_BASE_URL}/news-upload-photo`, formData, {
      headers: {"Content-Type":"multipart/form-data"}
     }).then(res => {
      const {data: filename} = res    
      setAddedPhotos(filename)
  })
  }

  // all field authentication
  const handleAuthentication = () =>{
    if(newsData.title === ""){
      setFirstMessage("this field is required")
    } else if (newsData.content === ""){
      setSecondMessage("this field is required")
    } else if (addedPhotos === ""){
      setThirdMessage("this field is required")
    } else {
     setShowModal(true)
    }
  }
    // news data submission
    const submitNews = async () => {
      const newsInfo = { ...newsData, newsPhoto: addedPhotos, startDate };
    
      try {
        if (editId !== "") {
          // Editing news information
         const response = await axios.put(`${API_BASE_URL}/news`, { editId, ...newsInfo });
         console.log('Update successful:', response.data);
         updateUI()
        } else {
          // Posting news information
          await axios.post(`${API_BASE_URL}/news`, newsInfo);
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
        setShowModal(false);
        setNewsData({ title: "", content: "" });
        setAddedPhotos("");
      }
    };
            
    
    useEffect(() => {
      if (!editId) {
        return;
      }
    
      axios.get(`${API_BASE_URL}/news` + editId).then((response) => {
        const { data } = response;
        setNewsData({ title: data.title, content: data.content });
        setAddedPhotos(data.newsPhoto);
      });
    }, [editId, setNewsData, setAddedPhotos]); // Include missing dependencies
    
 
  return (
    <>
      <div>
        <h1 className="capitalize">title:</h1>
        <input
          type="text"
          placeholder={firstMessage ? firstMessage: "new title"}
          value={newsData.title}
          onChange={(ev) => handleNewsChange(ev, "title")}
        />
        <h1 className="capitalize mt-2">content:</h1>
        <textarea
          name="content"
          id="content"
          placeholder={secondMessage ? secondMessage : ""}
          value={newsData.content}
          onChange={(ev) => handleNewsChange(ev, "content")}
        ></textarea>
        <div className="flex gap-8 mt-2 items-center">
          <div className="hidden">
          <DatePickerComponent onChange={(date: Date | null) => setStartDate(date)} selected={startDate} />
          </div>
          <div className="flex gap-3 mt-2">
          <Upload uploadFile={uploadFile} isMultiple={false}/>
          {addedPhotos ? (
             <div className="relative w-28 h-20"> 
             <Image
                 src={addedPhotos}
                 alt="Description"
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 layout="fill"
                 objectFit="cover"  // Use Tailwind's utility class for object-fit
                 className="absolute inset-0 rounded-xl"
             />
           </div>
          ) : <p>{thirdMessage}</p> }
          </div>
        </div>
        <Button
          href="#"
          text="preview"
          className="border-none mt-3"
          onClick={handleAuthentication}
        />
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <Preview title={newsData.title} content={newsData.content} src={addedPhotos} onClick={submitNews} prevText={editId === "" ? "post news" : "update news"}/>
        </Modal>
      </div>
    </>
  );
};

export default AddNews;

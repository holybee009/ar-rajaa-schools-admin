"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../atoms/button";
import { API_BASE_URL } from "@/config";
import axios, {AxiosError} from "axios";
import Upload from "../../atoms/upload";

const AddAcknowledgement = () => {
    const [acknowledgement, setAcknowledgement] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [error, setError] = useState("")
    const [photo, setPhoto] = useState<string>("")

    const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setAcknowledgement(ev.target.value)
    }
    const handleUpdate =()=> {
        if (acknowledgement === ""){
            setMessage("no acknowledgement yet")
        } else if( photo === ""){setError("add a file")}  
        else {axios.post(`${API_BASE_URL}/acknowledgement`, {acknowledgement, photo})}
        setAcknowledgement("")
        setPhoto("")
    }
    const uploadFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files;
        const formData = new FormData();
        if(files){ for(let i = 0 ; i < files.length; i++){
          formData.append('acknowledgement-photo',files[i])
         };}
    
         axios.post(`${API_BASE_URL}/acknowledgement-upload-photo`, formData, {
          headers: {"Content-Type":"multipart/form-data"}
         }).then(res => {
          const {data: filename} = res
          setPhoto(filename)
      })
      }
    return (
        <>
        <div>
        <h1 className="capitalize">acknowledgement:</h1>
        <textarea
          name="content"
          id="content"
          placeholder={message ==="" ? message : "write an acknowledgement"}
          value={acknowledgement}
          onChange={(ev) => handleChange(ev)}
        ></textarea>
         <div className="flex gap-8 items-center">
          <Upload uploadFile={uploadFile} isMultiple={false}/>
          {photo? (
            <Image
              src={photo}
              alt="Uploaded"
              style={{ maxWidth: "100%", height: "auto" }}
              width={80}
              height={80}
            />
          ) : <p>{error}</p> }
          </div>
        <Button text="update acknowledgement" href="#" onClick={handleUpdate} className="mt-5"/>
        </div>
        </>
    )
}

export default AddAcknowledgement;

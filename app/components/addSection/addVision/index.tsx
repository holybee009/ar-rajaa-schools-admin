"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../atoms/button";
import { API_BASE_URL } from "@/config";
import axios, {AxiosError} from "axios";
import Upload from "../../atoms/upload";

const AddVision = () => {
    const [vision, setVision] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [error, setError] = useState("")
    const [photo, setPhoto] = useState<string>("")

    const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setVision(ev.target.value)
    }
    const handleUpdate =()=> {
        if (vision === ""){
            setMessage("no vision yet")
        } else if( photo === ""){setError("add a file")}  
        else {axios.post(`${API_BASE_URL}/vision`, {vision, photo})}
        setVision("")
        setPhoto("")
    }
    const uploadFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const files = ev.target.files;
        const formData = new FormData();
        if(files){ for(let i = 0 ; i < files.length; i++){
          formData.append('vision-photo',files[i])
         };}
    
         axios.post(`${API_BASE_URL}/vision-upload-photo`, formData, {
          headers: {"Content-Type":"multipart/form-data"}
         }).then(res => {
          const {data: filename} = res
          setPhoto(filename)
      })
      }
    return (
        <>
        <div>
        <h1 className="capitalize">vision:</h1>
        <textarea
          name="content"
          id="content"
          placeholder={message ==="" ? message : "write an vision"}
          value={vision}
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
        <Button text="update vision" href="#" onClick={handleUpdate} className="mt-5"/>
        </div>
        </>
        
    )
}

export default AddVision;

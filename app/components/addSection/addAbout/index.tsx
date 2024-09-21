"use client";
import React, { useState, useEffect } from "react";
import Button from "../../atoms/button";
import { API_BASE_URL } from "@/config";
import axios, {AxiosError} from "axios";

const AddAbout = () => {
    const [about, setAbout] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setAbout(ev.target.value)
    }
    const handleUpdate =()=> {
        if (about === ""){
            setMessage("no about yet")
        } else {axios.post(`${API_BASE_URL}/about`, {about})}
        setAbout("")
    }
    return (
        <>
        <div>
        <h1 className="capitalize">about school:</h1>
        <textarea
          name="content"
          id="content"
          placeholder={message ==="" ? message : "write about ar-rajaa schools"}
          value={about}
          onChange={(ev) => handleChange(ev)}
          className="mb-5"
        ></textarea>
        <Button text="update about" href="#" onClick={handleUpdate}/>
        </div>
        </>
        
    )
}

export default AddAbout;

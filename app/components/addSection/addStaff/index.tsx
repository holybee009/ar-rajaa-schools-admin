"use client";
import React, { useState, useEffect } from "react";
import Upload from "../../atoms/upload";
import Button from "../../atoms/button";
import axios from "axios";
import Image from "next/image";
import { API_BASE_URL } from "@/config";

interface Props {
    addClass: () => void
    staffEditId: string
}

const AddStaff = ({addClass, staffEditId}: Props) => {
  const [staffName, setStaffName] = useState<string>("");
  const [staffClass, setStaffClass] = useState<string>("");
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [firstError, setFirstError] = useState<boolean>(false);
  const [secondError, setSecondError] = useState<boolean>(false);
  
  
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


  // uploading staff photo
  const uploadFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    const formData = new FormData();
    if(files){ for(let i = 0 ; i < files.length; i++){
      formData.append('staff-photo',files[i])
     };}

     axios.post(`${API_BASE_URL}/staff-upload-photo`, formData, {
      headers: {"Content-Type":"multipart/form-data"}
     }).then(res => {
      const {data: filename} = res
      setUploadedFileUrl(filename)
  })
  }

//   get staff data for edit
useEffect(() => {
  if (!staffEditId) {
    return;
  }

  axios.get(`${API_BASE_URL}/staff` + staffEditId).then((response) => {
    const { data } = response;
    setSelectedYear(data.selectedYear);
    setStaffName(data.staffName);
    setStaffClass(data.staffClass);
    setUploadedFileUrl(data.uploadedFileUrl);
  });
}, [staffEditId, setSelectedYear, setStaffName, setStaffClass, setUploadedFileUrl]); // Include missing dependencies


//   submit staff details
  const handleSubmit = async () => {
   if(staffName === "") {
    setFirstError(true)
   } else if (staffClass === "") {
    setSecondError(true)
   } else if (uploadedFileUrl === ""){
    setMessage("add a file")
   } else {
    try {
        if (staffEditId !== "") {
          // Editing staff information
         const response = await axios.put(`${API_BASE_URL}/staff`, { id: staffEditId, selectedYear, staffName, staffClass, uploadedFileUrl });
         console.log('Update successful:', response.data);
         alert(response.data)
        } else {
          // Posting staff information
          const request = await axios.post(`${API_BASE_URL}/staff`, {selectedYear, staffName, staffClass, uploadedFileUrl});
          request && addClass();
          alert(request.data)
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
        setStaffClass("")
        setStaffName("")
        setUploadedFileUrl("")
      }
      
    
   }
  }
  return (
    <>
      <div>
      <div className="text-center capitalize underline">
            <select id="academicYear" value={selectedYear} onChange={handleYearChange}>
              {academicYears.map((academicYear) => (
                <option key={academicYear} value={academicYear}>
                  {academicYear}
                </option>
              ))}
            </select>
            <span> academic session</span>
        </div>
        <h1 className="capitalize">staff name:</h1>
        <input
          type="text"
          placeholder={firstError ? "no name is inputed" : "input staff name"}
          value={staffName}
          onChange={(ev) => setStaffName(ev.target.value)}
        />
        <h1 className="capitalize">staff class:</h1>
        <input
          type="text"
          placeholder={secondError ? "no class is inputed" : "input staff class"}
          value={staffClass}
          onChange={(ev) => setStaffClass(ev.target.value)}
        />
        <div className="flex gap-3 mt-2">
          <Upload uploadFile={uploadFile} isMultiple={false}/>
          {uploadedFileUrl && (
          <div className="relative w-1/5 h-20"> 
          <Image
              key={uploadedFileUrl}
              src={uploadedFileUrl}
              alt="Description"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              layout="fill"
              objectFit="cover"  // Use Tailwind's utility class for object-fit
              className="absolute inset-0 rounded-xl"
          />
        </div>
          )}
        </div>
        {message && <p>{message}</p>}
        <Button
          href="#"
          text={staffEditId !== "" ? "update staff info" : "add staff"}
          className="border-none mt-3"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default AddStaff;

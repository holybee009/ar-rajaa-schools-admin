"use client";
import React, { useState } from "react";
import Upload from "../../atoms/upload";
import Button from "../../atoms/button";
import axios from "axios";
import Image from "next/image";
import { API_BASE_URL } from "@/config";


const AddStaff = () => {
  const [staffName, setstaffName] = useState<string>("");
  const [staffClass, setstaffClass] = useState<string>("");
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


//   submit staff details
  const handleSubmit = () => {
   if(staffName === "") {
    setFirstError(true)
   } else if (staffClass === "") {
    setSecondError(true)
   } else if (uploadedFileUrl === ""){
    setMessage("add a file")
   } else {
    axios.post(`${API_BASE_URL}/staff`, {selectedYear, staffName, staffClass, uploadedFileUrl});
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
          onChange={(ev) => setstaffName(ev.target.value)}
        />
        <h1 className="capitalize">staff class:</h1>
        <input
          type="text"
          placeholder={secondError ? "no class is inputed" : "input staff class"}
          value={staffClass}
          onChange={(ev) => setstaffClass(ev.target.value)}
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
          children="add staff"
          className="border-none mt-3"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default AddStaff;

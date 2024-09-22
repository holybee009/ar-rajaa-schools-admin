"use client";
import React, { useState, useEffect } from "react";
import Upload from "../../atoms/upload";
import Button from "../../atoms/button";
import axios from "axios";
import Image from "next/image";
import { API_BASE_URL } from "@/config";

interface Props {
    addClass: () => void
    studentEditId: string
}

const AddStudent = ({addClass, studentEditId}: Props) => {
  const [studentName, setStudentName] = useState<string>("");
  const [studentClass, setStudentClass] = useState<string>("");
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


  // uploading student photo
  const uploadFile = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    const formData = new FormData();
    if(files){ for(let i = 0 ; i < files.length; i++){
      formData.append('student-photo',files[i])
     };}

     axios.post(`${API_BASE_URL}/student-upload-photo`, formData, {
      headers: {"Content-Type":"multipart/form-data"}
     }).then(res => {
      const {data: filename} = res
      setUploadedFileUrl(filename)
  })
  }

//   get student data for edit
useEffect(() => {
    if (!studentEditId){
      return
    }
       
    axios.get(`${API_BASE_URL}/student` + studentEditId).then(response => {
     const {data} = response;
     setSelectedYear(data.selectedYear)
     setStudentName(data.studentName)
     setStudentClass(data.studentClass)
     setUploadedFileUrl(data.uploadedFileUrl)
    })
  },[studentEditId,setSelectedYear,setStudentName, setStudentClass, setUploadedFileUrl])

//   submit student details
  const handleSubmit = async () => {
   if(studentName === "") {
    setFirstError(true)
   } else if (studentClass === "") {
    setSecondError(true)
   } else if (uploadedFileUrl === ""){
    setMessage("add a file")
   } else {
    try {
        if (studentEditId !== "") {
          // Editing student information
         const response = await axios.put(`${API_BASE_URL}/student`, { id: studentEditId, selectedYear, studentName, studentClass, uploadedFileUrl });
         console.log('Update successful:', response.data);
         alert(response.data)
        } else {
          // Posting student information
          const request = await axios.post(`${API_BASE_URL}/student`, {selectedYear, studentName, studentClass, uploadedFileUrl});
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
        setStudentClass("")
        setStudentName("")
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
        <h1 className="capitalize">student name:</h1>
        <input
          type="text"
          placeholder={firstError ? "no name is inputed" : "input student name"}
          value={studentName}
          onChange={(ev) => setStudentName(ev.target.value)}
        />
        <h1 className="capitalize">student class:</h1>
        <input
          type="text"
          placeholder={secondError ? "no class is inputed" : "input student class"}
          value={studentClass}
          onChange={(ev) => setStudentClass(ev.target.value)}
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
          text={studentEditId !== "" ? "update student info" : "add student"}
          className="border-none mt-3"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
};

export default AddStudent;

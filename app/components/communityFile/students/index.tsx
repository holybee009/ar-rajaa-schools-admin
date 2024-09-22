"use client";
import React, { useState, useEffect } from "react";
import AddStudent from "../../addSection/addStudent";
import AcademicSessions from "../../miniComponents/academicSessions";
import AcademicClasses from "../../miniComponents/academicClasses";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import StudentData from "../../updateData/studentsData";

interface Data {
  selectedYear:string, 
  studentName:string, 
  studentClass: string, 
  uploadedFileUrl: string
}
const StudentUI = () => {
 const [activate, setActivate] = useState<boolean>(false)
 const [display, setDisplay] = useState<boolean>(false)
 const [displayClasses, setDisplayClasses] = useState<boolean>(false)
 const [studentData, setStudentData] = useState<string[]>([])
 const [updateClass, setUpdateClass] = useState<boolean>(false)
 const [selectedYear, setSelectedYear] = useState<string>("")
 const [studentClass, setStudentClass] = useState<string>("")
 const [results, setResults] = useState<any[]>([]); // To store search results
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);
 const [update, setUpdate] = useState<boolean>(false)
 const [studentEditId, setStudentEditId] = useState<string>("")

 const showClasses = (value: string) => {
  setDisplay(true)
  setSelectedYear(value)
 }
 
 // refresh student data
 const updateDelete = () => {
 setUpdate(!update)
 }

//  handling student data for each classes
 const studentProfile = async (value: string) =>{
  setStudentClass(value)
  setUpdate(!update)
  setDisplayClasses(true)
 };

 const fetchData = async () =>{
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(`${API_BASE_URL}/student`, {
      params: { selectedYear, studentClass },
    });
    setResults(response.data);
  }  catch (error) {
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
 }
// back to classes menu
 const handleBack = () =>{
  setDisplayClasses(false)
  setDisplay(true)
  // setUpdate(!update)
 }
// back to session menu
 const sessionBack = () => {
  setDisplay(false)
 }
  
    useEffect(() => {
      fetchData();
    }, [update]);
 

const onData = (val:string) =>{
  setActivate(true)
  setStudentEditId(val)
} 
//  getting data of added classes
 useEffect (() => {
  const fetchData = async () => {
    const response = await axios.get(`${API_BASE_URL}/student`);
    const datas = response.data
    const studentClasses =  datas.map((data: Data) => data.studentClass)
    setStudentData(studentClasses)
  }
  fetchData()
 },[updateClass, fetchData])


 
return (
<div>
    <div className="flex gap-5 justify-around">
        <p className={`capitalize cursor-pointer ${activate ? 'text-[#000]' : 'text-[#EE3A57]'}`} onClick={()=>setActivate(false)}>sessions</p>
        <p className={`capitalize cursor-pointer ${activate ? 'text-[#EE3A57]' : 'text-[#000]'}`} onClick={()=>setActivate(true)}>add new student</p>
    </div>
    <div className="py-3">
          {activate === true ? (
           <AddStudent addClass={()=> setUpdateClass(true)} studentEditId={studentEditId}/>         
          ) : (
          <div>
            {displayClasses ? <StudentData data={results} loading={loading} error={error} updateUI={updateDelete} onData={onData} handleBack={handleBack}/> : 
            <div>
            {display ? <AcademicClasses handleBack={sessionBack} classesData={studentData} studentsProfile={studentProfile}/> : <AcademicSessions showClasses={showClasses} textTitle="Academic Year List"/> }
            </div> 
            }
          </div>
          )}
      </div>
</div>
  );
};

export default StudentUI;

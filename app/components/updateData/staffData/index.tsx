'use client'
import {useState, useEffect} from "react"
import axios from "axios"
import { API_BASE_URL } from "@/config"
import Modal from "../../miniComponents/modal"
import Button from "../../atoms/button"
import StaffBlock from "../../miniComponents/staffBlock"

interface Staff{
    _id: string,
    selectedYear: string,
    staffClass: string,
    staffName: string,
    uploadedFileUrl: string
}

interface Props {
    updateUI: () => void
    onData: (val: string) => void
    data: Staff[]
    error: string | null,
    loading: boolean,
    handleBack: () => void
}

const StaffData = ({data,loading,error, updateUI, onData, handleBack}: Props) =>{
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")
    
    // send edit id to the Staff ui page
    const editStaff = (val:string) => {
     onData(val)
    }
  
    //set delete authentication to true
    const deleteStaff = (val:string) => {
      setValue(val)
      setDeleteConfirmation(true)
    }
  
    // delete post
    const deletePost = async (value: string) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/staff` + value)
        updateUI()
        alert(response.data.message);
      }  catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('error deleting post', error.response 
              ? error.response.data : error.message)
        } else {
          // Non-Axios error
          console.error('Error:', error);
          alert('An unexpected error occurred.');
        }
      }
      setDeleteConfirmation(false)
    }

    return <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : 
      data.length > 0 ? 
      (
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {
        data.slice().reverse().map((datas) => 
         <StaffBlock 
            src={datas.uploadedFileUrl}
            title={datas.staffName}
            onEditClick={() => editStaff(datas._id)}
            onDeleteClick={() => deleteStaff(datas._id)}
        />
        )
        }
        </div>
      ) : (
        <p>No post yet</p>
      )}
    {<Modal show={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
        <div>
          <p className="text-center">Are you sure you want to delete this post?</p>
          <p className="text-center mb-6 text-sm text-[#EE3A57]">This action cannot be undone!!!</p>
          <div className="flex justify-between gap-20">
            <Button href="#" children="cancel"  className="capitalize cursor-pointer border-[#00000080]"
            color="#000"       // Black text color
            bgColor="#fff"  onClick={() => setDeleteConfirmation(false)}/>
            <Button href="#" children="delete" className="capitalize cursor-pointer w-3/4" onClick={() => deletePost(value)}/>
          </div>
        </div>
        </Modal>
      }
      <Button href="#" children="back" onClick={() => handleBack()} className="absolute right-3 bottom-3 w-full inset-x-0"/>
    </div>
}

export default StaffData;
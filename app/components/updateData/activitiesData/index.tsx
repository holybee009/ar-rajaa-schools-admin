'use client'
import {useState, useEffect} from "react"
import axios from "axios"
import { API_BASE_URL } from "@/config"
import Modal from "../../miniComponents/modal"
import Button from "../../atoms/button"
import ActivitiesBlock from "../../miniComponents/activitiesBlock"

interface Props {
    reloadNews: boolean;
    onData: (val: string) => void
}

interface Recent{
    _id: string;
    activity: string;
    activityPhotos: string[]; 
}
const ActivitiesData = ({reloadNews, onData}: Props) =>{
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Recent[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [updated, setUpdated] = useState<boolean>(false)
  
  // get recent activities data from database
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/activities`);
        setData(response.data);
      } catch (error) {
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
    };
  
    useEffect(() => {
      fetchData();
    }, [updated === true || reloadNews === true]);
  
    // send edit id to the recent activities page
    const editRecent = (val:string) => {
     onData(val)
    }
  
    //set delete authentication to true
    const deleteRecent = (val:string) => {
      setValue(val)
      setDeleteConfirmation(true)
    }
  
    // delete post
    const deletePost = async (value: string) => {
      try {
        const response = await axios.delete(`${API_BASE_URL}/activities` + value)
        alert(response.data.message);
        setUpdated(true)
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
        data.slice().reverse().map((datas) => (
         <ActivitiesBlock 
           key={datas._id}
            src={datas.activityPhotos[0]}
            title={datas.activity}
            onEditClick={() => editRecent(datas._id)}
            onDeleteClick={() => deleteRecent(datas._id)}
        />
        ))
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
    </div>
}

export default ActivitiesData
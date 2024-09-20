import React, { useEffect, useState } from "react";
import NewsBlock from "../../miniComponents/newsBlock";
import Modal from "../../miniComponents/modal";
import Button from "../../atoms/button";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "@/config";


interface Props {
  onData: (val: string) => void;
  reloadNews: boolean;
}

interface News {
  _id: string;
  title: string;
  newsPhoto: string;
  content: string;
}
const NewsData = ({onData, reloadNews} : Props) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<News[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [updated, setUpdated] = useState<boolean>(false)

// get news data from database
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/news`);
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
  }, [updated,reloadNews]);

  // send edit id to the news page
  const editNews = (val:string) => {
   onData(val)
  }

  //set delete authentication to true
  const deleteNews = (val:string) => {
    setValue(val)
    setDeleteConfirmation(true)
  }

  // delete post
  const deletePost = async (value: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/news` + value)
      response.data.message !== "" && setUpdated(!updated)
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
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : data.length > 0 ? (
        data.slice().reverse().map((datas) => (
          <NewsBlock
            key={datas._id}
            src={datas.newsPhoto}
            title={datas.title}
            content={datas.content}
            onEditClick={() => editNews(datas._id)}
            onDeleteClick={() => deleteNews(datas._id)}
          />
        ))
      ) : (
        <p>No post yet</p>
      )}
      {<Modal show={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
        <div>
          <p className="text-center">Are you sure you want to delete this post?</p>
          <p className="text-center mb-6 text-sm text-[#EE3A57]">This action cannot be undone!!!</p>
          <div className="flex justify-between gap-20">
          <Button
            href="#"
            children="Cancel"
            className="capitalize cursor-pointer border-[#00000080]"
            color="#000"       // Black text color
            bgColor="#fff"  // Green background color
            onClick={() => setDeleteConfirmation(false)}
          />


            <Button href="#" children="delete" className="capitalize cursor-pointer w-3/4" onClick={() => deletePost(value)}/>
          </div>
        </div>
        </Modal>
      }
    </div>
  );
};

export default NewsData;

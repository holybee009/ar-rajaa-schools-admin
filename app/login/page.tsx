"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For App Router, use `next/navigation`
import { useAuth } from '../../useAuth';
import Button from "../components/atoms/button";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import User from "../components/atoms/icons/user.svg"
import Lock from "../components/atoms/icons/lock.svg"
import {FaEye, FaEyeSlash} from "react-icons/fa"
import { API_BASE_URL } from "@/config";
import Logo from "../components/atoms/images/ar-rajaa logo1.png"


interface logs {
  username: string;
  password: string;
}
interface Error{
  state: boolean;
  message: string;
}
const Page: React.FC = () => {
  const [loginInput, setLoginInput] = useState<logs>({
    username: "",
    password: "",
  });
  const [firstInputError, setFirstInputError] = useState<Error>({
    state: false,
    message: ""
  })
  const [secondInputError, setSecondInputError] = useState<Error>({
    state: false,
    message: ""
  })
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    key: keyof logs
  ) => {
    const value = ev.target.value;
    setLoginInput((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    setFirstInputError({state: false, message:""})
    setSecondInputError({state: false, message:""})
  };

  
  const loginAdmin = async () => {
      // posting of login details

    // try {
    //   const response = await axios.post(
    //     `${API_BASE_URL}/register`,
    //     loginInput
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(loginInput.username);
    // authentication of logins
    if (loginInput.username === "") {
      setFirstInputError({ state: true, message: "this field is required" });
    } else if (loginInput.password === "") {
      setSecondInputError({ state: true, message: "this field is required" });
    } else if (loginInput.username !== "" && loginInput.password !== "") {
      try {
        const {data} = await axios.post(`${API_BASE_URL}/login`, loginInput);
        setAuthenticated(true);
        alert(data.message)
            // Save the token in local storage
        localStorage.setItem('token', data.token);
        console.log(data.token);
          // Set token and redirect
        login(data.token);
        router.push('/');
      } catch (error) {
        // Type assertion to AxiosError
        const axiosError = error as AxiosError;
  
        if (axiosError.response) {
          // Server responded with a status code that falls out of the range of 2xx
          console.log(axiosError.response.data);
          alert(axiosError.response.data);
        } else if (axiosError.request) {
          // Request was made but no response was received
          console.log(axiosError.request);
          alert("No response received from server");
        } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error', axiosError.message);
          alert(axiosError.message);
        }
      }
    }
  };
  
  return (
    <div className="flex gap-3 justify-center h-screen">
      <div className="sm:bg-[#0D3C1D] w-1/3 flex flex-col justify-center items-center absolute sm:static sm:top-auto top-10 pt-10 sm:pt-auto lg:w-1/3 sm:w-full">
        <Image src={Logo} alt="logo" width={120} height={120} className="w-14 h-16 sm:h-auto sm:w-auto"/>
        <h1 className="text-black sm:text-white uppercase text-md sm:text-3xl">ar-rajaa</h1>
        <h1 className="text-[#EE3A57] uppercase text-sm sm:text-2xl">schools</h1>
      </div>
      <div className="sm:px-3 self-center lg:w-auto w-full px-9 ">
        <h1 className="font-bold sm:text-5xl capitalize pb-7 text-3xl">log in</h1>
        <div className="relative flex items-center">
        <input
          type="text"
          name="username"
          id="username"
          placeholder={firstInputError.message === "" ? "username" : firstInputError.message}
          className="my-2"
          onChange={(ev) => handleChange(ev, "username")}
          value={loginInput.username}
          style={{paddingLeft: "2.2rem",paddingRight: "2.2rem",border: firstInputError.state ? `1px solid #EE3A57`: ""}}
        />
        <Image src={User} width={20} height={20} alt="user" className="absolute left-3 text-gray-400"/>
        </div>
        <div className="relative flex items-center">
        <input
          type={showPassword? "text" : "password"}
          name="password"
          id="password"
          placeholder={secondInputError.message === "" ? "password" : secondInputError.message}
          className="my-2"
          onChange={(ev) => handleChange(ev, "password")}
          value={loginInput.password}
          style={{paddingLeft: "2.2rem",border: secondInputError.state ? `1px solid #EE3A57`: ""}}
        />
         <Image src={Lock} width={20} height={20} alt="password" className="absolute left-3 text-gray-400"/>
         <div className="absolute right-3 text-gray-400">
         {
          showPassword ? <FaEye onClick={() => setShowPassword(false)}/> :  <FaEyeSlash onClick={() => setShowPassword(true)}/>
         }
         </div>
        </div>
        <div className="flex justify-between p-2 text-xs sm:text-sm items-center">
          <div className="text-center capitalize flex justify-center gap-2">
            <input type="checkbox" /> remember me
          </div>
          <div className="capitalize hover:underline hover:text-red-500 cursor-pointer">forgot password</div>
        </div>
        <Button
          width="1000"
          href="#"
          text="log in"
          color="#EE3A57"
          className="capitalize border-none text-[white] w-full mt-3"
          onClick={loginAdmin}
        />
      </div>
    </div>
  );
};

export default Page;

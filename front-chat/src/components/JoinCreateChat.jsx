import React, { useState } from 'react'
import chatIcon from "../assets/chat.png"
import toast from 'react-hot-toast'
import {createRoomApi, joinChatApi} from "../services/RoomService";
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';
const JoinCreateChat = () => {
  const [detail ,setDetail]=useState({
    roomId:"",
    userName:"",
  })

   const {roomId, userName,setRoomId,setCurrentUser,setConnected}=useChatContext();
   const navigate =useNavigate()

  function handleFormInputChange(event){
setDetail({
  ...detail,
  [event.target.name]:event.target.value,
})
  }
// it will check the details of the values entered
  function validateForm(){
    if (detail.roomId === "" || detail.userName === "") {
      toast.error(" Galat Details !!")
      return false;
    }
    return true;
  }

 async function joinChat(){
if (validateForm()) {
  
  try {
    // join chat helps the buttons to navigate through page if condition true
  const room= await joinChatApi(detail.roomId)
  toast.success("joined the room.....")
  setCurrentUser(detail.userName);
setRoomId(room.roomId);
setConnected(true);
// this is the function which navigates
navigate("/chat");

  } catch (error) {
    if (error.status==400) {
      
       toast.error(error.response.data);
    }
   else{
    toast.error("Error in joinning room");
   }
    console.log(error);
  }
}
  }
 async function createRoom(){
if(validateForm()){
  // create roomhelps the buttons to navigate through page if condition true
  console.log(detail);
  // call api to create room on backend
  try {
   const response= await createRoomApi(detail.roomId)
   console.log(response)
   toast.success("Room Created Successfully !!");
   // join the room
setCurrentUser(detail.userName);
setRoomId(response.roomId);
setConnected(true);
navigate("/chat");


//forward to chat page


  } catch (error) {
    console.log(error);
    if (error.status == 400) {
      toast.error("Room id already Exists!!")
    }
     else{
 toast.error ("Error in creating room");
    }
   
  }
}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-indigo-100 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950">

  <div className="p-10 w-full flex flex-col gap-8 max-w-md rounded-[2rem] bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border border-white/30 dark:border-gray-700 shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

    <div className="flex justify-center -mb-2">
      <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30 animate-pulse">
        <img
          src={chatIcon}
          alt="Chat Icon"
          className="w-16 h-16 object-contain drop-shadow-lg"
        />
      </div>
    </div>

    <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
      Join Room / Create Room
    </h1>

    {/* For name bracket */}
    <div className="">
      <label
        htmlFor="name"
        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200 tracking-wide"
      >
        Your Name
      </label>

      <input
      //here we are giving the input in the name field
      onChange={handleFormInputChange}
      value={detail.userName}

        type="text"
        id="name"
        name="userName"
        placeholder="Enter your name"
        className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-md hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
      />
    </div>

    {/* Room bracket in sign-in page */}
    <div className="">
      <label
        htmlFor="roomId"
        className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200 tracking-wide"
      >
        Your Id / New Id
      </label>

      <input
      // here we are giving the value in roombracke just below line
      name="roomId"
      onChange={handleFormInputChange}
      value={detail.roomId}


        type="text"
        id="roomId"
        placeholder="Enter room ID"
        className="w-full px-5 py-3 rounded-2xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 shadow-md hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
      />
    </div>

    {/* Buttons */}
    <div className="flex justify-center gap-6">
      <button onClick={joinChat} className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-400 dark:hover:to-indigo-400">
        Join Room
      </button>

      <button onClick={createRoom} className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-400 dark:hover:to-teal-400">
        Create Room
      </button>
    </div>

  </div>

</div>
  )
}

export default JoinCreateChat
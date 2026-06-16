import React, { useEffect, useRef, useState } from 'react'
import { MdAttachFile, MdSend } from 'react-icons/md'
import useChatContext from '../context/ChatContext'
import { useNavigate } from 'react-router'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import toast from 'react-hot-toast'
import {baseURL} from "../config/AxiosHelper";
import { getMessages } from '../services/RoomService'
import { timeAgo } from '../config/helper'

const ChatPage = () => {
  const {roomId,currentUser,connected,setConnected,setRoomId,setCurrentUser }= useChatContext()
// console.log(roomId);
// console.log(currentUser);
// console.log(connected);

const navigate= useNavigate()
useEffect(()=>{
  if(!connected){
     navigate('/');
  }
},[connected,roomId,currentUser])


    const [messages,setMessages]=useState([
 
      
]);
const [input,setInput]=useState("");
const inputRef=useRef(null);
const chatBoxRef=useRef(null);
const [stompClient,setStompClient]=useState(null);

// page init:
//messages ko load krne honge
useEffect(() => {
  async function loadMessages() {
try {
  const messages =await getMessages(roomId)
  // console.log(messages);
setMessages(messages)

} catch (error) {
  
}
    
  }
 if (connected) {
   loadMessages();
  
 }
},[])



// to scroll when the messages get more than the required size
useEffect(()=>{
if (chatBoxRef.current) {
  chatBoxRef.current.scroll({
    top:chatBoxRef.current.scrollHeight,
    behavior:"smooth",
  });
  
}


},[messages])

//stompClient ko init karne honge
//subscribe connection

useEffect(()=>{
const connectWebScoket=()=>{
  // sockjs 
  const sock= new SockJS(`${baseURL}/chat`)
  const client=Stomp.over(sock)

  client.connect({}, () => {
    setStompClient(client);


    toast.success("connected");
    client.subscribe(`/topic/room/${roomId}`, (message) => {
      console.log(message);
      const newMessage = JSON.parse(message.body);
      setMessages((prev) => [...prev, newMessage]);
      // rest of the work after success receving the message
    });
  });

};
if (connected) {
  connectWebScoket();
  
}

//stomp client configuration

},[roomId])



// send message ko handle krna hoga
const sendMessage=async ()=> {
  if (stompClient && connected && input.trim()) {
    console.log(input);
    
    const message={
      sender:currentUser,
      content:input,
      roomId:roomId
    }
    stompClient.send(`/app/sendMessage/${roomId}`,{},JSON.stringify(message));
    setInput("");
  }
    
  
};
// this for logout button function
function handleLogout(){
  stompClient.disconnect()
  setConnected(false)
  setRoomId("")
  setCurrentUser("");
  navigate('/');
}





  return (
    <div className="">
        {/* This is header portion for working */}
       <header className="flex items-center justify-between fixed w-full px-8 py-5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-2xl rounded-2xl mx-4 mt-4">

    {/* Room name container */}
    <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Room:
            <span className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 text-sm">
                {roomId}
            </span>
        </h1>
    </div>

    {/* user name container */}
    <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
            U
        </div>

        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            User:
            <span className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 text-sm">
                {currentUser}
            </span>
        </h1>
    </div>

    {/* leave room button */}
    <div>
        <button onClick={handleLogout} className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 via-red-600 to-rose-600 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95">
            Leave Room
        </button>
    </div>

</header>

<main ref={chatBoxRef} className="pt-28 pb-28 w-2/3 mx-auto h-screen overflow-y-auto px-5">
{
    messages.map((message,index)=>(
  // this is part for side of the message      
<div
  key={index}
  className={`flex ${
    message.sender === currentUser
      ? "justify-end"
      : "justify-start"
  }`}
>
{/* // this is the part where we change the colour of the sender receiver */}
 <div
  className={`
    my-4
    inline-block
    max-w-[280px]
    px-3
    py-2
    rounded-3xl
    shadow-lg
    ${
      message.sender === currentUser
        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
        : "bg-white dark:bg-slate-800"
    }
  `}
>
         <div className="flex flex-row items-start gap-2">
    {/* here we will change the avatar according to the sender or receiver */}
  <img
    src="https://api.dicebear.com/10.x/adventurer/svg"
    alt="avatar"
    className="
      w-9
      h-9
      rounded-full
      object-cover
      shadow-md
      ring-2
      ring-white
      dark:ring-slate-600
      flex-shrink-0
    "
  />

  <div
    className="
      max-w-[75%]
      px-1
      py-1
      bg-transparent
    "
  >
    <p className="text-xs font-bold text-indigo-500 mb-1 tracking-wide">
      {message.sender}
    </p>

    <p
      className={`
        text-sm
        leading-relaxed
        break-words
        ${
          message.sender === currentUser
            ? "text-white"
            : "text-gray-800 dark:text-gray-100"
        }
      `}
    >
      {message.content}
    </p>
    <p className="text-xs text-gray-400">{timeAgo(message.timestamp)}</p>
  </div>
</div>
  </div>
</div>

    ))
}
</main>

{/* input message part or container */}
<div className="fixed bottom-4 w-full h-20 px-4">
  <div className="flex items-center h-full w-full md:w-2/3 mx-auto px-4 rounded-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

    <input
    value={input}
    onChange={(e) => {setInput(e.target.value)}}
    // this is the function where we are checking if the key is enter the send message
    onKeyDown={(e)=>{
      if (e.key === "Enter") {
        sendMessage();
        
      }
    }}

      type="text"
      placeholder="Type your message here...."
      className="flex-1 h-full px-4 bg-transparent text-gray-800 dark:text-white text-lg placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none"
    />

    <div className="flex items-center gap-3">
{/* This is attach file button */}
      <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white h-12 w-12 flex justify-center items-center rounded-full shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300">
        <MdAttachFile className="text-xl rotate-45" />
      </button>
{/* This is send button  */}
      <button onClick={sendMessage}   
      className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white h-12 w-12 flex justify-center items-center rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300">
        <MdSend className="text-xl" />
      </button>

    </div>

  </div>
</div>


    </div>
  )
}

export default ChatPage
import React from "react";
import UserInfo from "./UserInfo";
import Channels from './Channels';



import "./Sidebar.css";

function Sidebar() {
  return (
   <div className='side'>
      <UserInfo />
      <Channels />
   </div>
  )
}

export default Sidebar;

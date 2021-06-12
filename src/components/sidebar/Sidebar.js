import React from "react";
import { Menu } from "semantic-ui-react";
import UserInfo from "./UserInfo";


import "./Sidebar.css";

function Sidebar() {
  return (
    <Menu vertical fixed="left" borderless size="huge" className="side_bar">
      <UserInfo />
    </Menu>
  )
}

export default Sidebar;

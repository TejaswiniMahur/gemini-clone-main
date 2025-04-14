// import React from 'react';
import './Sidebar.css';
import {assets} from '../../assets/assets';
import React, { useState } from 'react';

const Sidebar = () => {

  const [extented,setExtended]=useState(false)
  return (
    <div className='Sidebar'>
      <div className="Sidebas-container">
        <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extented?<p>New Chat</p>:null}
        </div>
        {extented?<div className="recent">
        <p className="recent-title">Recent</p>
        <div className="recent-entry">
          <img src={assets.message_icon} alt="" />
          <p>What is react ...</p>
        </div>
      </div>:null}
      </div>
      

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extented?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extented?<p>Activity</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extented?<p>Setting</p>:null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

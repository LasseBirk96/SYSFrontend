import "../Css-files/home.css"
import facade from "../apiFacade"
import MySearchSite from "./MySearchSite"
import React, { useEffect, useState } from 'react';
import ReactDom from "react-dom";

export default function Home() {

 


  return (
<div>  
  <h1 className="title"> Looking for a specific food or destination? Let <span className="logo">TravelEat </span> help! </h1>
      <div>    
      <MySearchSite/> 
      </div>       
</div> 
  );
  }

/* /context/AppContext.js */
import { useState, createContext, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { gql } from "@apollo/client";
// create auth context with default value

// set backup default for isAuthenticated if none is provided in Provider
const AppContext = createContext(
    {isAuthenticated:true, 
        cart: {items:[], 
        total:0},
        addItem:()=>{},
        removeItem:()=>{},
        user:false, 
        setUser:()=>{}
    });
    
export default AppContext;
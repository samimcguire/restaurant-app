import { useContext, useState } from "react";
import Head from "next/head";
import AppContext from "@/components/context";
import Layout from "@/components/layout";
import "@/styles/globals.css";


function MyApp(props){
  var {user, setUser} = useContext(AppContext)
  const { Component, pageProps } = props

  return (
    <AppContext.Provider value={{isAuthenticated:false, user:null, setUser:()=>{}}}>
      <Head />
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
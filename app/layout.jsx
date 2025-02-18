  "use client"
  
  import "../styles/globals.css";
  import Nav from "../components/Nav";
  import store from "../redux/store";
  import { Provider } from "react-redux";
  import { Suspense } from "react";
  import SessionPro from "@/ components/provider";
  import Head from "next/head"


  export default function RootLayout({ children }) {


    return (

      <html lang="en">
        <head>
          <title>ShopUp</title>  
        </head>
        <SessionPro>
        <Provider store={store}>  
          <Suspense fallback={<div>Loading...</div>}>
            <body className="bg-white dark:bg-gray-900 text-black dark:text-white">
              <Nav />
              {children}
            </body>
          </Suspense>
        </Provider>
        </SessionPro>

      </html>
    );
  }

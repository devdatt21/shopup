  "use client"
  import "../styles/globals.css";
  import Nav from "../components/Nav";
  import store from "../redux/store";
  import { Provider } from "react-redux";
  import { Suspense } from "react";
  import SessionPro from "@/ components/provider";


  export default function RootLayout({ children }) {


    return (

      <html lang="en">
        
        <SessionPro>
        <Provider store={store}>  
          <Suspense fallback={<div>Loading...</div>}>
            <body>
              <Nav />
              {children}
            </body>
          </Suspense>
        </Provider>
        </SessionPro>

      </html>
    );
  }

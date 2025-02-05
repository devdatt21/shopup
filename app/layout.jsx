"use client"
import "../styles/globals.css";
import Nav from "../components/Nav";
import store from "../redux/store";
import { Provider } from "react-redux";





export default function RootLayout({ children }) {


  return (

    <html lang="en">
      
      <Provider store={store}>
        <body>
          <Nav />
          {children}
        </body>
      </Provider>

    </html>
  );
}

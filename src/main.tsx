import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./routes/Router";

const htmlElement = document.getElementById('root');

if (process.env.NODE_ENV === 'PRODUCTION') {
  ReactDOM.createRoot(htmlElement as HTMLElement)
    .render(<RouterProvider router={router} />)
} else {
  ReactDOM.createRoot(htmlElement as HTMLElement)
    .render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    )
}
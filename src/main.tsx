import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import router from "./routes/Router";
import 'flowbite';
import './index.css'

const htmlElement = document.getElementById('root');

ReactDOM.createRoot(htmlElement as HTMLElement)
  .render(<RouterProvider router={router} />)
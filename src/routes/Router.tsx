import {createBrowserRouter} from "react-router-dom";
import NotFound from "../pages/error/NotFound";
import PlatformsPage from "../pages/platform/PlatformsPage";
import CryptosPage from "../pages/crypto/CryptosPage";
import DashboardsPage from "../pages/dashboard/DashboardsPage";
import AddPlatformPage from "../pages/platform/AddPlatformPage";
import AddCryptoPage from "../pages/crypto/AddCryptoPage";
import EditCryptoPage from "../pages/crypto/EditCryptoPage";
import EditPlatformPage from "../pages/platform/EditPlatformPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardsPage/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/home',
    element: <DashboardsPage/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/platforms',
    element: <PlatformsPage/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/platform',
    element: <AddPlatformPage/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/platform/:id',
    element: <EditPlatformPage/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/cryptos',
    element: <CryptosPage/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/crypto',
    element: <AddCryptoPage/>,
    errorElement: <NotFound/>,
  },
  {
    path: '/crypto/:id',
    element: <EditCryptoPage/>,
    errorElement: <NotFound/>,
  },
]);

export default router
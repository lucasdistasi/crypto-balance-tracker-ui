import {createBrowserRouter} from "react-router-dom";
import NotFoundPage from "../pages/error/NotFoundPage";
import PlatformsPage from "../pages/platform/PlatformsPage";
import CryptosPage from "../pages/crypto/CryptosPage";
import DashboardsPage from "../pages/dashboard/DashboardsPage";
import AddPlatformPage from "../pages/platform/AddPlatformPage";
import AddCryptoPage from "../pages/crypto/AddCryptoPage";
import EditCryptoPage from "../pages/crypto/EditCryptoPage";
import EditPlatformPage from "../pages/platform/EditPlatformPage";
import InternalErrorPage from "../pages/error/InternalErrorPage";
import GoalsPage from "../pages/goal/GoalsPage";
import EditGoalPage from "../pages/goal/EditGoalPage";
import AddGoalPage from "../pages/goal/AddGoalPage";
import TransferCryptoPage from "../pages/crypto/TransferCryptoPage";

// TODO - ADD ErrorBoundary.

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardsPage/>,
  },
  {
    path: '/home',
    element: <DashboardsPage/>,
  },
  {
    path: '/platforms',
    element: <PlatformsPage/>,
  },
  {
    path: '/platform',
    element: <AddPlatformPage/>,
  },
  {
    path: '/platform/:id',
    element: <EditPlatformPage/>,
  },
  {
    path: '/cryptos',
    element: <CryptosPage/>,
  },
  {
    path: '/crypto',
    element: <AddCryptoPage/>,
  },
  {
    path: '/crypto/:id',
    element: <EditCryptoPage/>,
  },
  {
    path: '/goal',
    element: <AddGoalPage/>
  },
  {
    path: '/goals',
    element: <GoalsPage/>
  },
  {
    path: '/goal/:id',
    element: <EditGoalPage/>
  },
  {
    path: '/transfer/:id',
    element: <TransferCryptoPage/>
  },
  {
    path: '/404',
    element: <NotFoundPage/>
  },
  {
    path: '/error',
    element: <InternalErrorPage/>
  }
]);

export default router
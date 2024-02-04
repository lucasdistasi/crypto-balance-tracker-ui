import {createBrowserRouter, Outlet} from "react-router-dom";
import NotFoundPage from "../pages/error/NotFoundPage";
import PlatformsPage from "../pages/platform/PlatformsPage";
import CryptosPage from "../pages/crypto/CryptosPage";
import AddPlatformPage from "../pages/platform/AddPlatformPage";
import AddCryptoPage from "../pages/crypto/AddCryptoPage";
import EditCryptoPage from "../pages/crypto/UpdateCryptoPage";
import EditPlatformPage from "../pages/platform/UpdatePlatformPage";
import InternalErrorPage from "../pages/error/InternalErrorPage";
import GoalsPage from "../pages/goal/GoalsPage";
import EditGoalPage from "../pages/goal/UpdateGoalPage";
import AddGoalPage from "../pages/goal/AddGoalPage";
import TransferCryptoPage from "../pages/crypto/TransferCryptoPage";
import ErrorBoundary from "../ErrorBoundary";
import PlatformInsightsPage from "../pages/insights/PlatformInsightsPage";
import CryptosPlatformsInsightsPage from "../pages/insights/CryptosPlatformsInsightsPage";
import CryptosInsightsPage from "../pages/insights/CryptosInsightsPage";
import HomePage from "../pages/home/HomePage";
import CryptoInsightsPage from "../pages/insights/CryptoInsightsPage";

const ErrorBoundaryLayout = () => (
  <ErrorBoundary fallback={<InternalErrorPage/>}>
    <Outlet/>
  </ErrorBoundary>
);

const router = createBrowserRouter([{
  element: <ErrorBoundaryLayout/>,
  children: [
    {
      path: '*',
      element: <NotFoundPage/>
    },
    {
      path: '/',
      element: <HomePage/>,
    },
    {
      path: '/home',
      element: <HomePage/>,
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
      path: '/insights/cryptos',
      element: <CryptosInsightsPage/>
    },
    {
      path: '/insights/cryptos-platforms',
      element: <CryptosPlatformsInsightsPage/>
    },
    {
      path: '/insights/platform/:platformId',
      element: <PlatformInsightsPage/>
    },
    {
      path: '/insights/cryptos/:coingeckoCryptoId',
      element: <CryptoInsightsPage/>
    },
    {
      path: '/404',
      element: <NotFoundPage/>
    },
    {
      path: '/error',
      element: <InternalErrorPage/>
    }
  ]
}]);

export default router
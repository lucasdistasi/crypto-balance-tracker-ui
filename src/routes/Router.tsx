import {createBrowserRouter, Outlet} from "react-router-dom";
import NotFoundPage from "../pages/error/NotFoundPage";
import PlatformsPage from "../pages/platform/PlatformsPage";
import CryptosPage from "../pages/crypto/CryptosPage";
import AddPlatformPage from "../pages/platform/AddPlatformPage";
import AddCryptoPage from "../pages/crypto/AddCryptoPage";
import InternalErrorPage from "../pages/error/InternalErrorPage";
import GoalsPage from "../pages/goal/GoalsPage";
import AddGoalPage from "../pages/goal/AddGoalPage";
import TransferCryptoPage from "../pages/crypto/TransferCryptoPage";
import ErrorBoundary from "../ErrorBoundary";
import PlatformInsightsPage from "../pages/insights/PlatformInsightsPage";
import CryptosPlatformsInsightsPage from "../pages/insights/CryptosPlatformsInsightsPage";
import CryptosInsightsPage from "../pages/insights/CryptosInsightsPage";
import HomePage from "../pages/home/HomePage";
import CryptoInsightsPage from "../pages/insights/CryptoInsightsPage";
import UpdateGoalPage from "../pages/goal/UpdateGoalPage";
import UpdateCryptoPage from "../pages/crypto/UpdateCryptoPage";
import UpdatePlatformPage from "../pages/platform/UpdatePlatformPage";
import AddPriceTarget from "../pages/pricetarget/AddPriceTarget";
import PriceTargetsPage from "../pages/pricetarget/PriceTargetsPage";
import UpdatePriceTargetPage from "../pages/pricetarget/UpdatePriceTargetPage";

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
      element: <UpdatePlatformPage/>,
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
      element: <UpdateCryptoPage/>,
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
      element: <UpdateGoalPage/>
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
      path: '/price-target',
      element: <AddPriceTarget/>
    },
    {
      path: '/price-targets',
      element: <PriceTargetsPage/>
    },
    {
      path: '/price-targets/:id',
      element: <UpdatePriceTargetPage/>
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
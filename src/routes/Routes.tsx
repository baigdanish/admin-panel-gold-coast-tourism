import BlankLayout from "../components/layouts/BlankLayout";
import ProtectedRoute from "../components/layouts/protectedLayout";
import Login from "../pages/auth/Login";
import BookingTracker from "../pages/BookingTracker";
import CustomerManagement from "../pages/CustomerManagement";
import Dashboard from "../pages/Dashboard";
import ManualBookingManagement from "../pages/ManualBooking";
import TourManagement from "../pages/TourManagement";
import TourDetailPage from "../pages/TourManagement/TourDetail";
import VoucherGenerator from "../pages/VoucherGenerator";
import AppRoutes from "./appRoutes";

const AUTH_ROUTES = [
  {
    path: "/",
    element: <BlankLayout />,
    children: [{ path: AppRoutes.LOGIN, element: <Login /> }],
  },
];
const APP_ROUTES = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: AppRoutes.DASHBOARD,
        element: <Dashboard />,
      },
      // Add other protected routes here

      {
        path: AppRoutes.BOOKING_TRACKER,
        element: <BookingTracker />,
      },
      {
        path: AppRoutes.CUSTOMER_MANAGEMENT,
        element: <CustomerManagement />,
      },
      {
        path: AppRoutes.VOUCHER_GENERATOR,
        element: <VoucherGenerator />,
      },
      {
        path: AppRoutes.TOUR_MANAGEMENT,
        element: <BlankLayout />,
        children: [
          {
            path: AppRoutes.TOUR_MANAGEMENT,
            element: <TourManagement />,
          },
          {
            path: `${AppRoutes.TOUR_MANAGEMENT}/:id`,
            element: <TourDetailPage />,
          },
        ],
      },
      {
        path: AppRoutes.MANUAL_BOOKING,
        element: <ManualBookingManagement />,
      },
    ],
  },
  // Add public/unprotected routes here if needed
];

export { AUTH_ROUTES, APP_ROUTES };

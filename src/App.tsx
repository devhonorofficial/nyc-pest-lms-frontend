import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import { ToastProvider } from "./context/ToastContext";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import StatesPage from "./pages/StatesPage";
import CategoryPage from "./pages/CategoryPage";
import CourseListingPage from "./pages/CourseListingPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverviewPage from "./pages/dashboard/DashboardOverviewPage";
import DashboardProfilePage from "./pages/dashboard/DashboardProfilePage";
import DashboardEnrolledCoursesPage from "./pages/dashboard/DashboardEnrolledCoursesPage";
import DashboardCoursePlayerPage from "./pages/dashboard/DashboardCoursePlayerPage";
import DashboardOrderHistoryPage from "./pages/dashboard/DashboardOrderHistoryPage";
import DashboardSettingsPage from "./pages/dashboard/DashboardSettingsPage";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ProfileProvider>
            <CartProvider>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/states" element={<StatesPage />} />
                <Route path="/states/:stateSlug" element={<CategoryPage />} />
                <Route path="/states/:stateSlug/:categorySlug" element={<CourseListingPage />} />
                <Route path="/courses/:courseSlug" element={<CourseDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/my-courses" element={<Navigate to="/dashboard/courses" replace />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardOverviewPage />} />
                  <Route path="profile" element={<DashboardProfilePage />} />
                  <Route path="courses" element={<DashboardEnrolledCoursesPage />} />
                  <Route path="courses/:courseSlug" element={<DashboardCoursePlayerPage />} />
                  <Route path="orders" element={<DashboardOrderHistoryPage />} />
                  <Route path="settings" element={<DashboardSettingsPage />} />
                </Route>
              </Routes>
            </CartProvider>
          </ProfileProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

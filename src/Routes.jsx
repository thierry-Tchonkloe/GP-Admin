// import React from "react";
// import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
// import ScrollToTop from "components/ScrollToTop";
// import ErrorBoundary from "components/ErrorBoundary";
// // Add your imports here
// import CompanyRegistration from "pages/company-registration";
// import Login from "pages/login";
// import Dashboard from "pages/dashboard";
// import AttendanceTracking from "pages/attendance-tracking";
// import EmployeeRegistration from "pages/employee-registration";
// import EmployeeManagement from "pages/employee-management";
// import ReportsAnalytics from "pages/reports-analytics";
// import SystemSettings from "pages/system-settings";
// import NotFound from "pages/NotFound";

// const Routes = () => {
//   return (
//     <BrowserRouter>
//       <ErrorBoundary>
//       <ScrollToTop />
//       <RouterRoutes>
//         {/* Define your routes here */}
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/company-registration" element={<CompanyRegistration />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/attendance-tracking" element={<AttendanceTracking />} />
//         <Route path="/employee-registration" element={<EmployeeRegistration />} />
//         <Route path="/employee-management" element={<EmployeeManagement />} />
//         <Route path="/reports-analytics" element={<ReportsAnalytics />} />
//         <Route path="/system-settings" element={<SystemSettings />} />
//         <Route path="*" element={<NotFound />} />
//       </RouterRoutes>
//       </ErrorBoundary>
//     </BrowserRouter>
//   );
// };

// export default Routes;






import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";

// Pages
import CompanyRegistration from "pages/company-registration";
import Login from "pages/login";
import Dashboard from "pages/dashboard";
import AttendanceTracking from "pages/attendance-tracking";
import EmployeeRegistration from "pages/employee-registration";
import EmployeeManagement from "pages/employee-management";
import ReportsAnalytics from "pages/reports-analytics";
import SystemSettings from "pages/system-settings";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* ✅ Page publique : inscription entreprise */}
          <Route path="/company-registration" element={<CompanyRegistration />} />

          {/* ✅ Page publique : login */}
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } />

          {/* ✅ Pages protégées : nécessite d'être connecté */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/attendance-tracking" element={
            <ProtectedRoute>
              <AttendanceTracking />
            </ProtectedRoute>
          } />

          <Route path="/employee-registration" element={
            <ProtectedRoute>
              <EmployeeRegistration />
            </ProtectedRoute>
          } />

          <Route path="/employee-management" element={
            <ProtectedRoute>
              <EmployeeManagement />
            </ProtectedRoute>
          } />

          <Route path="/reports-analytics" element={
            <ProtectedRoute>
              <ReportsAnalytics />
            </ProtectedRoute>
          } />

          <Route path="/system-settings" element={
            <ProtectedRoute>
              <SystemSettings />
            </ProtectedRoute>
          } />

          {/* ✅ Page 404 */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

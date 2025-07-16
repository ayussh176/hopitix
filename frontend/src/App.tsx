import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Auth pages
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import PatientSignup from "@/pages/auth/PatientSignup";
import DoctorSignup from "@/pages/auth/DoctorSignup";

// Dashboard pages
import PatientDashboard from "@/pages/dashboard/PatientDashboard";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import AssistantDashboard from "@/pages/dashboard/AssistantDashboard";
import PathologyDashboard from "@/pages/dashboard/PathologyDashboard";

// Patient pages
import BookAppointment from "@/pages/patient/BookAppointment";
import BookPathology from "@/pages/patient/BookPathology";
import AIChatSymptoms from "@/pages/patient/AIChatSymptoms";
import MyReports from "@/pages/patient/MyReports";
import Prescriptions from "@/pages/patient/Prescriptions";
import Settings from "@/pages/patient/Settings";

// Doctor pages
import TodaysAppointments from "@/pages/doctor/TodaysAppointments";
import SearchPatients from "@/pages/doctor/SearchPatients";
import NewPatient from "@/pages/doctor/NewPatient";
import DoctorPrescriptions from "@/pages/doctor/Prescriptions";
import DoctorSettings from "@/pages/doctor/Settings";

// Assistant pages
import ManageAppointments from "@/pages/assistant/ManageAppointments";
import MedicineSubstitutes from "@/pages/assistant/MedicineSubstitutes";

// Pathology pages
import PathologyRequests from "@/pages/pathology/PathologyRequests";
import UploadReports from "@/pages/pathology/UploadReports";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// Dashboard Router Component
const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect to appropriate dashboard based on user role
  const getDashboardPath = () => {
    switch (user.role) {
      case 'patient':
        return '/dashboard/patient';
      case 'doctor':
        return '/dashboard/doctor';
      case 'assistant':
        return '/dashboard/assistant';
      case 'pathology':
        return '/dashboard/pathology';
      default:
        return '/auth/login';
    }
  };

  return <Navigate to={getDashboardPath()} replace />;
};

// Auth Router Component
const AuthRouter = () => {
  const { user } = useAuth();

  if (user) {
    return <DashboardRouter />;
  }

  return <Navigate to="/auth/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<AuthRouter />} />
            
            {/* Authentication routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/signup/patient" element={<PatientSignup />} />
            <Route path="/auth/signup/doctor" element={<DoctorSignup />} />

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardRouter />} />

            {/* Patient Dashboard */}
            <Route
              path="/dashboard/patient"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <DashboardLayout>
                    <PatientDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/patient/book-appointment"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <DashboardLayout>
                    <BookAppointment />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/patient/book-pathology"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <DashboardLayout>
                    <BookPathology />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/patient/ai-chat-symptoms"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <DashboardLayout>
                    <AIChatSymptoms />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/patient/reports"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <DashboardLayout>
                    <MyReports />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/patient/prescriptions"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <DashboardLayout>
                    <Prescriptions />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/patient/settings"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Doctor Dashboard */}
            <Route
              path="/dashboard/doctor"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DashboardLayout>
                    <DoctorDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/doctor/appointments"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DashboardLayout>
                    <TodaysAppointments />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/doctor/patients"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DashboardLayout>
                    <SearchPatients />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/doctor/new-patient"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DashboardLayout>
                    <NewPatient />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/doctor/prescriptions"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DashboardLayout>
                    <DoctorPrescriptions />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/doctor/settings"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DashboardLayout>
                    <DoctorSettings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Assistant Dashboard */}
            <Route
              path="/dashboard/assistant"
              element={
                <ProtectedRoute allowedRoles={['assistant']}>
                  <DashboardLayout>
                    <AssistantDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/assistant/appointments"
              element={
                <ProtectedRoute allowedRoles={['assistant']}>
                  <DashboardLayout>
                    <ManageAppointments />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/assistant/substitutes"
              element={
                <ProtectedRoute allowedRoles={['assistant']}>
                  <DashboardLayout>
                    <MedicineSubstitutes />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/assistant/settings"
              element={
                <ProtectedRoute allowedRoles={['assistant']}>
                  <DashboardLayout>
                    <DoctorSettings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Pathology Dashboard */}
            <Route
              path="/dashboard/pathology"
              element={
                <ProtectedRoute allowedRoles={['pathology']}>
                  <DashboardLayout>
                    <PathologyDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/pathology/requests"
              element={
                <ProtectedRoute allowedRoles={['pathology']}>
                  <DashboardLayout>
                    <PathologyRequests />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/pathology/upload"
              element={
                <ProtectedRoute allowedRoles={['pathology']}>
                  <DashboardLayout>
                    <UploadReports />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/pathology/settings"
              element={
                <ProtectedRoute allowedRoles={['pathology']}>
                  <DashboardLayout>
                    <DoctorSettings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Unauthorized access */}
            <Route 
              path="/unauthorized" 
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
                    <p className="text-xl text-gray-600">You don't have permission to access this page.</p>
                  </div>
                </div>
              } 
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Redirect to appropriate dashboard based on user role
      const dashboardPaths = {
        patient: '/dashboard/patient',
        doctor: '/dashboard/doctor', 
        assistant: '/dashboard/assistant',
        pathology: '/dashboard/pathology'
      };
      navigate(dashboardPaths[user.role] || '/auth/login');
    } else {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-900">Loading HealthAI...</h1>
        <p className="text-gray-600 mt-2">Redirecting you to the right place</p>
      </div>
    </div>
  );
};

export default Index;

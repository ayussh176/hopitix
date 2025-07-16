
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Calendar, 
  MessageCircle, 
  FileText, 
  Users, 
  UserPlus, 
  Settings, 
  LogOut,
  Heart,
  Search,
  Upload,
  Stethoscope,
  Activity,
  TestTube,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'patient':
        return [
          { to: '/dashboard/patient', icon: Activity, label: 'Dashboard' },
          { to: '/dashboard/patient/book-appointment', icon: Calendar, label: 'Book Appointment' },
          { to: '/dashboard/patient/book-pathology', icon: TestTube, label: 'Book Pathology' },
          { to: '/dashboard/patient/ai-chat-symptoms', icon: MessageCircle, label: 'AI Health Assistant' },
          { to: '/dashboard/patient/reports', icon: FileText, label: 'My Reports' },
          { to: '/dashboard/patient/prescriptions', icon: Heart, label: 'Prescriptions' },
        ];
      case 'doctor':
        return [
          { to: '/dashboard/doctor', icon: Stethoscope, label: 'Dashboard' },
          { to: '/dashboard/doctor/appointments', icon: Calendar, label: "Today's Appointments" },
          { to: '/dashboard/doctor/patients', icon: Search, label: 'Search Patients' },
          { to: '/dashboard/doctor/new-patient', icon: UserPlus, label: 'New Patient' },
          { to: '/dashboard/doctor/prescriptions', icon: FileText, label: 'Prescriptions' },
        ];
      case 'assistant':
        return [
          { to: '/dashboard/assistant', icon: ClipboardList, label: 'Dashboard' },
          { to: '/dashboard/assistant/appointments', icon: Calendar, label: 'Manage Appointments' },
          { to: '/dashboard/assistant/substitutes', icon: FileText, label: 'Medicine Substitutes' },
        ];
      case 'pathology':
        return [
          { to: '/dashboard/pathology', icon: TestTube, label: 'Dashboard' },
          { to: '/dashboard/pathology/requests', icon: ClipboardList, label: 'Pathology Requests' },
          { to: '/dashboard/pathology/upload', icon: Upload, label: 'Upload Reports' },
        ];
      default:
        return [];
    }
  };

  const getSettingsPath = () => {
    switch (user?.role) {
      case 'patient':
        return '/dashboard/patient/settings';
      case 'doctor':
        return '/dashboard/doctor/settings';
      case 'assistant':
        return '/dashboard/assistant/settings';
      case 'pathology':
        return '/dashboard/pathology/settings';
      default:
        return '/dashboard/patient/settings';
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">HealthAI</h1>
            <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {getNavigationItems().map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <NavLink to={getSettingsPath()}>
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </NavLink>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

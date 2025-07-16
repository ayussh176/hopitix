
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MessageCircle, 
  FileText, 
  TestTube, 
  Heart,
  Activity,
  Clock,
  CheckCircle
} from 'lucide-react';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Book Doctor Appointment',
      description: 'Schedule a consultation with our doctors',
      icon: Calendar,
      link: '/dashboard/patient/book-appointment',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'Book Pathology Test',
      description: 'Schedule lab tests and diagnostics',
      icon: TestTube,
      link: '/dashboard/patient/book-pathology',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      title: 'AI Health Assistant',
      description: 'Symptom checker and general health Q&A',
      icon: MessageCircle,
      link: '/dashboard/patient/ai-chat-symptoms',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  ];

  const recentActivity = [
    { type: 'appointment', title: 'Appointment with Dr. Sharma', date: '2024-01-15', status: 'completed' },
    { type: 'test', title: 'Blood Test Report Available', date: '2024-01-12', status: 'new' },
    { type: 'consultation', title: 'AI Symptom Check', date: '2024-01-10', status: 'completed' }
  ];

  const upcomingAppointments = [
    { doctor: 'Dr. Jadhav', specialty: 'Cardiology', date: '2024-01-20', time: '10:00 AM' },
    { doctor: 'Lab Test', specialty: 'Pathology', date: '2024-01-22', time: '9:00 AM' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Manage your health journey with AI-powered insights</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Health Score: 85/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <Card key={action.title} className="hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription className="text-sm">
                {action.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className={`w-full ${action.color} ${action.hoverColor}`}>
                <Link to={action.link}>Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Upcoming Appointments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{appointment.doctor}</p>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>
              ))}
              {upcomingAppointments.length === 0 && (
                <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'new' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.date}</p>
                  </div>
                  {activity.status === 'new' && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>Quick Access</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" asChild className="h-20 flex-col">
              <Link to="/dashboard/patient/reports">
                <FileText className="w-6 h-6 mb-2" />
                View Reports
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-20 flex-col">
              <Link to="/dashboard/patient/prescriptions">
                <Heart className="w-6 h-6 mb-2" />
                Prescriptions
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-20 flex-col">
              <Link to="/dashboard/patient/settings">
                <CheckCircle className="w-6 h-6 mb-2" />
                Profile Settings
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;

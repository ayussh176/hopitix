
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  UserPlus, 
  FileText, 
  Stethoscope,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();

  const todayStats = {
    totalAppointments: 12,
    completed: 8,
    pending: 3,
    cancelled: 1
  };

  const todayAppointments = [
    { 
      id: '1', 
      patient: 'ram Singh', 
      time: '09:00 AM', 
      type: 'Consultation', 
      status: 'completed',
      symptoms: 'Chest pain, shortness of breath'
    },
    { 
      id: '2', 
      patient: 'Siddhharth Mehta', 
      time: '10:30 AM', 
      type: 'Follow-up', 
      status: 'completed',
      symptoms: 'Diabetes checkup'
    },
    { 
      id: '3', 
      patient: 'Raghav Kumar', 
      time: '11:15 AM', 
      type: 'Consultation', 
      status: 'in-progress',
      symptoms: 'Headache, fever'
    },
    { 
      id: '4', 
      patient: 'Anjali Verma', 
      time: '02:00 PM', 
      type: 'Consultation', 
      status: 'pending',
      symptoms: 'Back pain'
    },
    { 
      id: '5', 
      patient: 'Priya Sharma', 
      time: '03:30 PM', 
      type: 'Follow-up', 
      status: 'pending',
      symptoms: 'Hypertension review'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Good morning, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Here's your schedule for today</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Today: {todayStats.totalAppointments} appointments</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Total</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{todayStats.totalAppointments}</div>
            <p className="text-sm text-gray-600">Appointments today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Completed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{todayStats.completed}</div>
            <p className="text-sm text-gray-600">Finished consultations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span>Pending</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{todayStats.pending}</div>
            <p className="text-sm text-gray-600">Awaiting consultation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Cancelled</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{todayStats.cancelled}</div>
            <p className="text-sm text-gray-600">Cancelled today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Today's Appointments</span>
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/doctor/appointments">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{appointment.patient}</h4>
                        <Badge className={getStatusColor(appointment.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(appointment.status)}
                            <span className="capitalize">{appointment.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                      <p className="text-sm text-gray-500">{appointment.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.time}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/dashboard/doctor/patients">
                  <Users className="w-4 h-4 mr-2" />
                  Search Patients
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/dashboard/doctor/new-patient">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Patient
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/dashboard/doctor/prescriptions">
                  <FileText className="w-4 h-4 mr-2" />
                  Prescriptions
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900">New lab results available</p>
                  <p className="text-blue-700">3 patients have new test results</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-900">Appointment confirmed</p>
                  <p className="text-green-700">2 new appointments scheduled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

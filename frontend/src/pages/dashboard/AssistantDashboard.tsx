import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {
  Calendar,
  Users,
  FileText,
  Clock,
  CheckCircle,
  ClipboardList,
  Phone
} from 'lucide-react';

const AssistantDashboard: React.FC = () => {
  const { user } = useAuth();
  const [appointmentRequests, setAppointmentRequests] = useState([
    {
      id: '1',
      patient: 'Ram Singh',
      requestedDate: '2024-01-20',
      requestedTime: '10:00 AM',
      status: 'pending',
      doctor: 'Dr. Jadhav',
      urgency: 'normal',
      phone: '+91 12345 67890',
      patientId: 'PAT001',
      symptoms: 'Chest pain, shortness of breath',
      preferredType: 'in-person'
    },
    {
      id: '2',
      patient: 'samar Singh',
      requestedDate: '2024-01-21',
      requestedTime: '02:00 PM',
      status: 'pending',
      doctor: 'Dr. Sharma',
      urgency: 'urgent',
      phone: '+91 98765 43210',
      patientId: 'PAT002',
      symptoms: 'Severe headache, nausea',
      preferredType: 'in-person'
    },
    {
      id: '3',
      patient: 'Mohan Sharma',
      requestedDate: '2024-01-22',
      requestedTime: '09:30 AM',
      status: 'confirmed',
      doctor: 'Dr. Jadhav',
      urgency: 'normal',
      phone: '+91 11223 44556',
      patientId: 'PAT003',
      symptoms: 'Regular checkup',
      preferredType: 'in-person'
    }
  ]);

  const handleConfirmAppointment = (appointmentId: string, type: 'in-person' | 'tele') => {
    setAppointmentRequests(prev =>
      prev.map(a =>
        a.id === appointmentId
          ? { ...a, status: 'confirmed', preferredType: type }
          : a
      )
    );
    const appointment = appointmentRequests.find(a => a.id === appointmentId);
    toast({
      title: 'Appointment Confirmed',
      description: `${type === 'tele' ? 'Tele-consultation' : 'In-person'} confirmed for ${appointment?.patient}`,
    });
  };

  const handleCallPatient = (phone: string, patientName: string) => {
    toast({
      title: 'Calling Patient',
      description: `Initiating call to ${patientName} at ${phone}`,
    });
  };

  const todayStats = {
    pendingRequests: 8,
    confirmedAppointments: 15,
    substituteSuggestions: 5
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Manage appointments and assist Dr. Johnson</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <ClipboardList className="w-5 h-5 text-purple-600" />
            <span className="text-purple-800 font-medium">Assigned to: Dr. Johnson</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span>Pending Requests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{todayStats.pendingRequests}</div>
            <p className="text-sm text-gray-600">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Confirmed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{todayStats.confirmedAppointments}</div>
            <p className="text-sm text-gray-600">Appointments today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Substitutes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{todayStats.substituteSuggestions}</div>
            <p className="text-sm text-gray-600">Medicine suggestions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Appointment Requests</span>
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/assistant/appointments">Manage All</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointmentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{request.patient}</h4>
                    <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{request.requestedDate} at {request.requestedTime}</p>
                  <p className="text-sm text-gray-500">Doctor: {request.doctor}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleCallPatient(request.phone, request.patient)}>
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  {request.status === 'pending' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Confirm
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Appointment</DialogTitle>
                          <DialogDescription>Choose appointment type for {request.patient}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleConfirmAppointment(request.id, 'in-person')}>
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <CheckCircle className="w-6 h-6 text-blue-600" />
                                <div>
                                  <h3 className="font-medium">In-Person</h3>
                                  <p className="text-sm text-gray-600">Patient visits clinic</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleConfirmAppointment(request.id, 'tele')}>
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <Phone className="w-6 h-6 text-green-600" />
                                <div>
                                  <h3 className="font-medium">Tele-Consultation</h3>
                                  <p className="text-sm text-gray-600">Video/phone consultation</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssistantDashboard;

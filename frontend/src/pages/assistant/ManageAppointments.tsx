
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Phone,
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  MapPin
} from 'lucide-react';

const ManageAppointments: React.FC = () => {
  const [appointmentRequests, setAppointmentRequests] = useState([
    { 
      id: '1', 
      patient: 'John Smith', 
      patientId: 'PAT001',
      requestedDate: '2024-01-20', 
      requestedTime: '10:00 AM', 
      status: 'pending',
      doctor: 'Dr. Johnson',
      urgency: 'normal',
      phone: '+1-234-567-8901',
      symptoms: 'Chest pain, shortness of breath',
      preferredType: 'in-person'
    },
    { 
      id: '2', 
      patient: 'Sarah Wilson', 
      patientId: 'PAT002',
      requestedDate: '2024-01-21', 
      requestedTime: '02:00 PM', 
      status: 'pending',
      doctor: 'Dr. Johnson',
      urgency: 'urgent',
      phone: '+1-234-567-8903',
      symptoms: 'Severe headache, nausea',
      preferredType: 'in-person'
    },
    { 
      id: '3', 
      patient: 'Mike Davis', 
      patientId: 'PAT003',
      requestedDate: '2024-01-22', 
      requestedTime: '09:30 AM', 
      status: 'confirmed',
      doctor: 'Dr. Johnson',
      urgency: 'normal',
      phone: '+1-234-567-8905',
      symptoms: 'Regular checkup',
      preferredType: 'in-person'
    }
  ]);

  const handleConfirmAppointment = (appointmentId: string, type: 'in-person' | 'tele') => {
    setAppointmentRequests(prev => 
      prev.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: 'confirmed', preferredType: type }
          : appointment
      )
    );
    
    const appointment = appointmentRequests.find(a => a.id === appointmentId);
    toast({
      title: "Appointment Confirmed",
      description: `${type === 'tele' ? 'Tele-consultation' : 'In-person appointment'} confirmed for ${appointment?.patient}`,
    });
  };

  const handleCallPatient = (phone: string, patientName: string) => {
    toast({
      title: "Calling Patient",
      description: `Initiating call to ${patientName} at ${phone}`,
    });
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Appointments</h1>
        <p className="text-gray-600 mt-1">Review and approve appointment requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span>Pending</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {appointmentRequests.filter(a => a.status === 'pending').length}
            </div>
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
            <div className="text-2xl font-bold text-green-600">
              {appointmentRequests.filter(a => a.status === 'confirmed').length}
            </div>
            <p className="text-sm text-gray-600">Appointments confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>Total</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{appointmentRequests.length}</div>
            <p className="text-sm text-gray-600">Total requests</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {appointmentRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{request.patient}</h4>
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {request.urgency}
                    </Badge>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p><strong>Patient ID:</strong> {request.patientId}</p>
                      <p><strong>Requested Date:</strong> {request.requestedDate}</p>
                      <p><strong>Requested Time:</strong> {request.requestedTime}</p>
                    </div>
                    <div>
                      <p><strong>Doctor:</strong> {request.doctor}</p>
                      <p><strong>Symptoms:</strong> {request.symptoms}</p>
                      <p><strong>Phone:</strong> {request.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCallPatient(request.phone, request.patient)}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  {request.status === 'pending' && (
                    <>
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
                            <DialogDescription>
                              Choose the type of appointment for {request.patient}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleConfirmAppointment(request.id, 'in-person')}>
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-3">
                                    <User className="w-6 h-6 text-blue-600" />
                                    <div>
                                      <h3 className="font-medium">In-Person Appointment</h3>
                                      <p className="text-sm text-gray-600">Patient visits the clinic</p>
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
                          </div>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageAppointments;

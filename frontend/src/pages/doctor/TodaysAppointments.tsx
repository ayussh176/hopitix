
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar, 
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';

const TodaysAppointments: React.FC = () => {
  const [appointments] = useState([
    { 
      id: '1', 
      patient: 'Jay raj', 
      patientId: 'PAT001',
      time: '09:00 AM', 
      type: 'Consultation', 
      status: 'completed',
      symptoms: 'Chest pain, shortness of breath',
      age: 45,
      gender: 'Male',
      phone: '+91 9354685475',
      address: 'Noida, Sector 62',
      medicalHistory: 'Hypertension, Diabetes',
      allergies: 'Penicillin',
      emergencyContact: 'Dheer raj - +91 8547965214'
    },
    { 
      id: '2', 
      patient: 'Sarah tomar', 
      patientId: 'PAT002',
      time: '10:30 AM', 
      type: 'Follow-up', 
      status: 'completed',
      symptoms: 'Diabetes checkup',
      age: 52,
      gender: 'Female',
      phone: '+91 9876543210',
      address: 'vasant kunj, Delhi',
      medicalHistory: 'Type 2 Diabetes',
      allergies: 'None',
      emergencyContact: 'Mohan tomar - +91 9876543210'
    },
    { 
      id: '3', 
      patient: 'Ravi kumar', 
      patientId: 'PAT003',
      time: '11:15 AM', 
      type: 'Consultation', 
      status: 'in-progress',
      symptoms: 'Headache, fever',
      age: 35,
      gender: 'Male',
      phone: '+91 9123456789',
      address: 'sant nagar, Delhi',
      medicalHistory: 'None',
      allergies: 'Shellfish',
      emergencyContact: 'Lata kumar - +91 9123456789'
    },
    { 
      id: '4', 
      patient: 'Anjali singh', 
      patientId: 'PAT004',
      time: '02:00 PM', 
      type: 'Consultation', 
      status: 'pending',
      symptoms: 'Back pain',
      age: 28,
      gender: 'Female',
      phone: '+91 9988776655',
      address: 'sonipat, Haryana',
      medicalHistory: 'None',
      allergies: 'Latex',
      emergencyContact: 'Rajesh singh - +91 9988776655'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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
          <h1 className="text-3xl font-bold text-gray-900">Today's Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your daily appointments</p>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
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
                  <p className="text-sm text-gray-600 mb-1">ID: {appointment.patientId}</p>
                  <p className="text-sm text-gray-600">{appointment.symptoms}</p>
                  <p className="text-sm text-gray-500">{appointment.type} • {appointment.time}</p>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Patient Details - {appointment.patient}</DialogTitle>
                        <DialogDescription>
                          Complete patient information and appointment details
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span>ID: {appointment.patientId}</span>
                              </div>
                              <p><strong>Age:</strong> {appointment.age}</p>
                              <p><strong>Gender:</strong> {appointment.gender}</p>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <span>{appointment.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>{appointment.address}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Emergency Contact</h3>
                            <p className="text-sm">{appointment.emergencyContact}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Medical Information</h3>
                            <div className="space-y-2 text-sm">
                              <div>
                                <strong>Symptoms:</strong>
                                <p className="text-gray-600">{appointment.symptoms}</p>
                              </div>
                              <div>
                                <strong>Medical History:</strong>
                                <p className="text-gray-600">{appointment.medicalHistory}</p>
                              </div>
                              <div>
                                <strong>Allergies:</strong>
                                <p className="text-gray-600">{appointment.allergies}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Appointment Details</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span>Today, {appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-gray-500" />
                                <span>{appointment.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodaysAppointments;

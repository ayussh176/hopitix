
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  TestTube, 
  Download,
  Eye,
  Clock,
  CheckCircle,
  Microscope,
  FileText,
  User,
  Calendar
} from 'lucide-react';

const PathologyRequests: React.FC = () => {
  const [testRequests, setTestRequests] = useState([
    { 
      id: 'REQ001', 
      patient: 'John Smith', 
      patientId: 'PAT001',
      testType: 'Complete Blood Count', 
      requestDate: '2024-01-18',
      urgency: 'normal',
      status: 'pending',
      doctor: 'Dr. Johnson',
      symptoms: 'Fatigue, weakness',
      notes: 'Patient reporting chronic fatigue for 2 weeks',
      sampleCollected: false
    },
    { 
      id: 'REQ002', 
      patient: 'Sarah Wilson', 
      patientId: 'PAT002',
      testType: 'Liver Function Test', 
      requestDate: '2024-01-18',
      urgency: 'urgent',
      status: 'in-progress',
      doctor: 'Dr. Smith',
      symptoms: 'Abdominal pain, nausea',
      notes: 'Follow-up after previous abnormal results',
      sampleCollected: true
    },
    { 
      id: 'REQ003', 
      patient: 'Mike Davis', 
      patientId: 'PAT003',
      testType: 'Lipid Profile', 
      requestDate: '2024-01-17',
      urgency: 'normal',
      status: 'completed',
      doctor: 'Dr. Brown',
      symptoms: 'Routine checkup',
      notes: 'Annual health screening',
      sampleCollected: true
    },
    { 
      id: 'REQ004', 
      patient: 'Emily Johnson', 
      patientId: 'PAT004',
      testType: 'Thyroid Function', 
      requestDate: '2024-01-17',
      urgency: 'normal',
      status: 'report-ready',
      doctor: 'Dr. Wilson',
      symptoms: 'Weight gain, fatigue',
      notes: 'Suspected hypothyroidism',
      sampleCollected: true
    }
  ]);

  const handleStatusChange = (requestId: string, newStatus: string) => {
    setTestRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: newStatus }
          : request
      )
    );
    
    const request = testRequests.find(r => r.id === requestId);
    toast({
      title: "Status Updated",
      description: `${request?.testType} for ${request?.patient} is now ${newStatus}`,
    });
  };

  const handleDownload = (requestId: string) => {
    const request = testRequests.find(r => r.id === requestId);
    toast({
      title: "Downloading Report",
      description: `Downloading ${request?.testType} report for ${request?.patient}`,
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
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'report-ready': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Microscope className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'report-ready': return <FileText className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pathology Requests</h1>
        <p className="text-gray-600 mt-1">Manage test requests and track progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span>Pending</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {testRequests.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-sm text-gray-600">Tests waiting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Microscope className="w-5 h-5 text-blue-600" />
              <span>In Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {testRequests.filter(r => r.status === 'in-progress').length}
            </div>
            <p className="text-sm text-gray-600">Tests processing</p>
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
            <div className="text-2xl font-bold text-green-600">
              {testRequests.filter(r => r.status === 'completed').length}
            </div>
            <p className="text-sm text-gray-600">Tests finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>Reports Ready</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {testRequests.filter(r => r.status === 'report-ready').length}
            </div>
            <p className="text-sm text-gray-600">Ready for download</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {testRequests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="font-medium text-gray-900">{request.patient}</h4>
                    <span className="text-sm text-gray-500">ID: {request.patientId}</span>
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {request.urgency}
                    </Badge>
                    <Badge className={getStatusColor(request.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status.replace('-', ' ')}</span>
                      </div>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <TestTube className="w-4 h-4 text-gray-500" />
                        <span><strong>Test:</strong> {request.testType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span><strong>Requested:</strong> {request.requestDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span><strong>Doctor:</strong> {request.doctor}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Symptoms:</strong> {request.symptoms}</p>
                      <p><strong>Notes:</strong> {request.notes}</p>
                      <p><strong>Sample Collected:</strong> 
                        <span className={request.sampleCollected ? 'text-green-600' : 'text-red-600'}>
                          {request.sampleCollected ? ' Yes' : ' No'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Select 
                    value={request.status} 
                    onValueChange={(value) => handleStatusChange(request.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="report-ready">Report Ready</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Test Request Details - {request.id}</DialogTitle>
                          <DialogDescription>
                            Complete information for {request.testType}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold mb-2">Patient Information</h3>
                              <div className="space-y-1 text-sm">
                                <p><strong>Name:</strong> {request.patient}</p>
                                <p><strong>ID:</strong> {request.patientId}</p>
                                <p><strong>Doctor:</strong> {request.doctor}</p>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">Test Information</h3>
                              <div className="space-y-1 text-sm">
                                <p><strong>Test Type:</strong> {request.testType}</p>
                                <p><strong>Request Date:</strong> {request.requestDate}</p>
                                <p><strong>Urgency:</strong> {request.urgency}</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Clinical Information</h3>
                            <div className="space-y-1 text-sm">
                              <p><strong>Symptoms:</strong> {request.symptoms}</p>
                              <p><strong>Clinical Notes:</strong> {request.notes}</p>
                              <p><strong>Sample Status:</strong> 
                                <span className={request.sampleCollected ? 'text-green-600' : 'text-red-600'}>
                                  {request.sampleCollected ? ' Collected' : ' Not Collected'}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {request.status === 'report-ready' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(request.id)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PathologyRequests;

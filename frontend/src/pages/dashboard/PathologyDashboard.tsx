
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TestTube, 
  Upload, 
  FileText, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Microscope,
  Download
} from 'lucide-react';

const PathologyDashboard: React.FC = () => {
  const { user } = useAuth();

  const testRequests = [
    { 
      id: '1', 
      patient: 'Ram Kumar', 
      testType: 'Complete Blood Count', 
      requestDate: '2024-01-18',
      urgency: 'normal',
      status: 'pending',
      doctor: 'Dr. Jadhav'
    },
    { 
      id: '2', 
      patient: 'Samar Singh', 
      testType: 'Liver Function Test', 
      requestDate: '2024-01-18',
      urgency: 'urgent',
      status: 'in-progress',
      doctor: 'Dr. Sharma'
    },
    { 
      id: '3', 
      patient: 'Mohan Sharma', 
      testType: 'Lipid Profile', 
      requestDate: '2024-01-17',
      urgency: 'normal',
      status: 'completed',
      doctor: 'Dr. Jadhav'
    },
    { 
      id: '4', 
      patient: 'Anjali Verma', 
      testType: 'Thyroid Function', 
      requestDate: '2024-01-17',
      urgency: 'normal',
      status: 'report-ready',
      doctor: 'Dr. Sharma'
    }
  ];

  const recentUploads = [
    { patient: 'anjali sharma', test: 'Blood Sugar', uploadDate: '2024-01-18', type: 'PDF' },
    { patient: 'Jay trivedi', test: 'X-Ray Chest', uploadDate: '2024-01-17', type: 'Image' },
    { patient: 'yash devedi', test: 'ECG Report', uploadDate: '2024-01-17', type: 'PDF' }
  ];

  const todayStats = {
    pendingTests: 12,
    inProgress: 5,
    completed: 8,
    reportsUploaded: 6
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pathology Lab Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome, {user?.name}! Manage test requests and reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span>Pending</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{todayStats.pendingTests}</div>
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
            <div className="text-2xl font-bold text-blue-600">{todayStats.inProgress}</div>
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
            <div className="text-2xl font-bold text-green-600">{todayStats.completed}</div>
            <p className="text-sm text-gray-600">Tests finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Upload className="w-5 h-5 text-purple-600" />
              <span>Uploaded</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{todayStats.reportsUploaded}</div>
            <p className="text-sm text-gray-600">Reports uploaded</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <TestTube className="w-5 h-5 text-purple-600" />
                  <span>Test Requests</span>
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/pathology/requests">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{request.patient}</h4>
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
                      <p className="text-sm font-medium text-gray-700">{request.testType}</p>
                      <p className="text-sm text-gray-600">Requested: {request.requestDate}</p>
                      <p className="text-sm text-gray-500">Doctor: {request.doctor}</p>
                    </div>
                    <div className="flex space-x-2">
                      {request.status === 'report-ready' && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                      <Button size="sm">
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
                <Upload className="w-5 h-5 text-blue-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                <Link to="/dashboard/pathology/upload">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Report
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/dashboard/pathology/requests">
                  <TestTube className="w-4 h-4 mr-2" />
                  View All Requests
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PathologyDashboard;

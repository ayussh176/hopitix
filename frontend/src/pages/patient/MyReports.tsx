
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Calendar,
  TestTube,
  Activity
} from 'lucide-react';

const MyReports: React.FC = () => {
  const pathologyReports = [
    {
      id: '1',
      testName: 'Complete Blood Count',
      reportDate: '2024-01-15',
      status: 'Available',
      doctor: 'Dr. Johnson',
      labName: 'City Pathology Lab',
      reportUrl: '/mock-report-1.pdf'
    },
    {
      id: '2',
      testName: 'Liver Function Test',
      reportDate: '2024-01-10',
      status: 'Available',
      doctor: 'Dr. Smith',
      labName: 'Metro Lab Services',
      reportUrl: '/mock-report-2.pdf'
    },
    {
      id: '3',
      testName: 'Thyroid Profile',
      reportDate: '2024-01-05',
      status: 'Available',
      doctor: 'Dr. Brown',
      labName: 'Advanced Diagnostics',
      reportUrl: '/mock-report-3.pdf'
    }
  ];

  const prescriptions = [
    {
      id: '1',
      doctorName: 'Dr. Johnson',
      date: '2024-01-18',
      medicines: ['Paracetamol 500mg', 'Amoxicillin 250mg'],
      diagnosis: 'Fever and throat infection',
      status: 'Active'
    },
    {
      id: '2',
      doctorName: 'Dr. Smith',
      date: '2024-01-12',
      medicines: ['Metformin 500mg', 'Glimepiride 1mg'],
      diagnosis: 'Diabetes management',
      status: 'Completed'
    }
  ];

  const handleDownload = (reportUrl: string, testName: string) => {
    // Mock download functionality
    console.log(`Downloading report: ${testName} from ${reportUrl}`);
    alert(`Downloading ${testName} report...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
        <p className="text-gray-600 mt-1">View your pathology reports and prescriptions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTube className="w-5 h-5 text-purple-600" />
              <span>Pathology Reports</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pathologyReports.map((report) => (
                <div key={report.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{report.testName}</h4>
                    <Badge className="bg-green-100 text-green-800">
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Lab: {report.labName}</p>
                  <p className="text-sm text-gray-600">Doctor: {report.doctor}</p>
                  <p className="text-sm text-gray-500">Date: {report.reportDate}</p>
                  <div className="mt-3 flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleDownload(report.reportUrl, report.testName)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Prescriptions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{prescription.doctorName}</h4>
                    <Badge className={prescription.status === 'Active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                      {prescription.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{prescription.diagnosis}</p>
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-600">Medicines:</p>
                    <ul className="text-sm text-gray-600 ml-4">
                      {prescription.medicines.map((medicine, index) => (
                        <li key={index}>• {medicine}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500">Date: {prescription.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyReports;

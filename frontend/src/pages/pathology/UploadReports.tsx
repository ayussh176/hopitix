
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { 
  Upload, 
  FileText, 
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const UploadReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [uploadData, setUploadData] = useState({
    file: null as File | null,
    reportType: '',
    findings: '',
    recommendations: '',
    normalValues: '',
    abnormalFlags: ''
  });

  const [pendingRequests] = useState([
    {
      id: 'REQ001',
      patient: 'Ram Singh',
      patientId: 'PAT001',
      testType: 'Complete Blood Count',
      requestDate: '2024-01-18',
      doctor: 'Dr. Jadhav',
      urgency: 'normal'
    },
    {
      id: 'REQ002',
      patient: 'Siddhharth Mehta',
      patientId: 'PAT002',
      testType: 'Liver Function Test',
      requestDate: '2024-01-18',
      doctor: 'Dr. Sharma',
      urgency: 'urgent'
    },
    {
      id: 'REQ005',
      patient: 'Raghav Kumar',
      patientId: 'PAT005',
      testType: 'Kidney Function Test',
      requestDate: '2024-01-19',
      doctor: 'Dr. Kumar',
      urgency: 'normal'
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadData(prev => ({ ...prev, file }));
  };

  const handleSearch = () => {
    const request = pendingRequests.find(r => 
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.patientId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (request) {
      setSelectedRequest(request);
      setUploadData(prev => ({ ...prev, reportType: request.testType }));
    } else {
      toast({
        title: "Request Not Found",
        description: "No pending request found with the provided search term.",
        variant: "destructive"
      });
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRequest) {
      toast({
        title: "No Request Selected",
        description: "Please search and select a request first.",
        variant: "destructive"
      });
      return;
    }

    if (!uploadData.file) {
      toast({
        title: "No File Selected",
        description: "Please select a report file to upload.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically upload to a server
    console.log('Uploading report for:', selectedRequest);
    console.log('Upload data:', uploadData);

    toast({
      title: "Report Uploaded Successfully",
      description: `Report for ${selectedRequest.patient} has been uploaded and patient will be notified.`,
    });

    // Reset form
    setSelectedRequest(null);
    setUploadData({
      file: null,
      reportType: '',
      findings: '',
      recommendations: '',
      normalValues: '',
      abnormalFlags: ''
    });
    setSearchTerm('');
  };

  const filteredRequests = pendingRequests.filter(request =>
    request.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Upload className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upload Reports</h1>
          <p className="text-gray-600 mt-1">Upload pathology reports for completed tests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Search Requests</CardTitle>
            <CardDescription>Find a request to upload report</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Request ID, Patient ID, or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>

            {searchTerm && (
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Matching Requests:</h3>
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedRequest?.id === request.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => {
                      setSelectedRequest(request);
                      setUploadData(prev => ({ ...prev, reportType: request.testType }));
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{request.patient}</p>
                        <p className="text-xs text-gray-600">{request.id} • {request.patientId}</p>
                        <p className="text-xs text-gray-500">{request.testType}</p>
                      </div>
                      {selectedRequest?.id === request.id && (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
                {filteredRequests.length === 0 && (
                  <p className="text-sm text-gray-500">No matching requests found</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Request Details */}
        <Card>
          <CardHeader>
            <CardTitle>Selected Request</CardTitle>
            <CardDescription>Details of the selected request</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedRequest ? (
              <div className="space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Request Selected</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><strong>Request ID:</strong> {selectedRequest.id}</p>
                    <p><strong>Patient:</strong> {selectedRequest.patient}</p>
                    <p><strong>Patient ID:</strong> {selectedRequest.patientId}</p>
                    <p><strong>Test Type:</strong> {selectedRequest.testType}</p>
                    <p><strong>Requested by:</strong> {selectedRequest.doctor}</p>
                    <p><strong>Date:</strong> {selectedRequest.requestDate}</p>
                    <p><strong>Urgency:</strong> 
                      <span className={selectedRequest.urgency === 'urgent' ? 'text-red-600' : 'text-blue-600'}>
                        {' ' + selectedRequest.urgency}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No request selected</p>
                <p className="text-sm text-gray-400">Search and select a request to upload its report</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Report</CardTitle>
            <CardDescription>Upload the pathology report file</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <Label htmlFor="reportFile">Report File *</Label>
                <Input
                  id="reportFile"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG
                </p>
              </div>

              <div>
                <Label htmlFor="reportType">Report Type</Label>
                <Input
                  id="reportType"
                  value={uploadData.reportType}
                  onChange={(e) => setUploadData(prev => ({ ...prev, reportType: e.target.value }))}
                  placeholder="e.g., Complete Blood Count"
                  readOnly={selectedRequest ? true : false}
                />
              </div>

              <div>
                <Label htmlFor="findings">Key Findings</Label>
                <Textarea
                  id="findings"
                  value={uploadData.findings}
                  onChange={(e) => setUploadData(prev => ({ ...prev, findings: e.target.value }))}
                  placeholder="Summarize the key findings..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  value={uploadData.recommendations}
                  onChange={(e) => setUploadData(prev => ({ ...prev, recommendations: e.target.value }))}
                  placeholder="Any recommendations or next steps..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="abnormalFlags">Abnormal Values/Flags</Label>
                <Textarea
                  id="abnormalFlags"
                  value={uploadData.abnormalFlags}
                  onChange={(e) => setUploadData(prev => ({ ...prev, abnormalFlags: e.target.value }))}
                  placeholder="List any abnormal values or critical flags..."
                  rows={2}
                />
              </div>

              <Button type="submit" className="w-full" disabled={!selectedRequest}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadReports;

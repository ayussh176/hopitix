
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search,
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Heart
} from 'lucide-react';

const SearchPatients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const mockPatients = [
    {
      id: 'PAT001',
      name: 'Ram Kumar',
      age: 45,
      gender: 'Male',
      phone: '+91 12345 67890',
      email: 'patient@demo.com',
      address: 'Noida sector 62, Delhi',
      dateOfBirth: '1979-03-15',
      medicalHistory: 'Hypertension, Diabetes',
      allergies: 'Penicillin',
      lastVisit: '2024-01-15',
      emergencyContact: 'Priya Kumar - +91 98765 43210'
    },
    {
      id: 'PAT002',
      name: 'radha Singh',
      age: 52,
      gender: 'Female',
      phone: '+1-234-567-8903',
      email: 'radha@demo.com',
      address: 'Gurgaon sector 17, Haryana',
      dateOfBirth: '1972-07-22',
      medicalHistory: 'Type 2 Diabetes',
      allergies: 'None',
      lastVisit: '2024-01-10',
      emergencyContact: 'Mohit singh - +91 12345 67891'
    },
    {
      id: 'PAT003',
      name: 'Mohan Sharma',
      age: 35,
      gender: 'Male',
      phone: '+1-234-567-8905',
      email: 'mohan@demo.com',
      address: 'sant nagar, Delhi',
      dateOfBirth: '1989-11-08',
      medicalHistory: 'None',
      allergies: 'Shellfish',
      lastVisit: '2024-01-18',
      emergencyContact: 'raj sharma - +91 56789 01234'
    }
  ];

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const results = mockPatients.filter(patient => 
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search Patients</h1>
        <p className="text-gray-600 mt-1">Search patients by their unique ID or name</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Search</CardTitle>
          <CardDescription>Enter patient ID or name to search</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Enter Patient ID (e.g., PAT001) or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Search Results ({searchResults.length})</h2>
          {searchResults.map((patient) => (
            <Card key={patient.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-gray-900">{patient.name}</h4>
                      <span className="text-sm text-gray-500">ID: {patient.id}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{patient.age} years, {patient.gender}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Last visit: {patient.lastVisit}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4" />
                        <span>Allergies: {patient.allergies}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">View Profile</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Patient Profile - {patient.name}</DialogTitle>
                          <DialogDescription>
                            Complete patient information and medical history
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                              <div className="space-y-2 text-sm">
                                <p><strong>ID:</strong> {patient.id}</p>
                                <p><strong>Name:</strong> {patient.name}</p>
                                <p><strong>Age:</strong> {patient.age}</p>
                                <p><strong>Gender:</strong> {patient.gender}</p>
                                <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
                                <div className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4 text-gray-500" />
                                  <span>{patient.phone}</span>
                                </div>
                                <p><strong>Email:</strong> {patient.email}</p>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4 text-gray-500" />
                                  <span>{patient.address}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Medical Information</h3>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <strong>Medical History:</strong>
                                  <p className="text-gray-600">{patient.medicalHistory}</p>
                                </div>
                                <div>
                                  <strong>Allergies:</strong>
                                  <p className="text-gray-600">{patient.allergies}</p>
                                </div>
                                <div>
                                  <strong>Last Visit:</strong>
                                  <p className="text-gray-600">{patient.lastVisit}</p>
                                </div>
                                <div>
                                  <strong>Emergency Contact:</strong>
                                  <p className="text-gray-600">{patient.emergencyContact}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button>Create Prescription</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No patients found matching "{searchTerm}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPatients;

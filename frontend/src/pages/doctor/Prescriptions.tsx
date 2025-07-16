import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { FileText, Plus, Search, Printer } from 'lucide-react';

const Prescriptions: React.FC = () => {
  const [prescriptions] = useState([
    {
      id: 'PRESC001',
      patientName: 'John Smith',
      patientId: 'PAT001',
      date: '2024-01-18',
      diagnosis: 'Hypertension',
      medicines: [
        { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days' }
      ]
    },
    {
      id: 'PRESC002',
      patientName: 'Sarah Johnson',
      patientId: 'PAT002',
      date: '2024-01-17',
      diagnosis: 'Diabetes Management',
      medicines: [
        { name: 'Insulin Glargine', dosage: '20 units', frequency: 'Once daily', duration: '30 days' }
      ]
    }
  ]);

  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    patientId: '',
    age: '',
    gender: '',
    temperature: '',
    bloodPressure: '',
    symptoms: '',
    diagnosis: '',
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }]
  });

  const handleAddMedicine = () => {
    setNewPrescription(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', dosage: '', frequency: '', duration: '' }]
    }));
  };

  const handleMedicineChange = (index: number, field: string, value: string) => {
    setNewPrescription(prev => ({
      ...prev,
      medicines: prev.medicines.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prescriptionId = `PRESC${String(Math.floor(Math.random() * 9000) + 1000)}`;
    
    console.log('New prescription:', { ...newPrescription, id: prescriptionId });
    
    toast({
      title: "Prescription Created",
      description: `Prescription ${prescriptionId} has been created for ${newPrescription.patientName}`,
    });

    // Reset form
    setNewPrescription({
      patientName: '',
      patientId: '',
      age: '',
      gender: '',
      temperature: '',
      bloodPressure: '',
      symptoms: '',
      diagnosis: '',
      medicines: [{ name: '', dosage: '', frequency: '', duration: '' }]
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
            <p className="text-gray-600 mt-1">Create and manage patient prescriptions</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Prescription</DialogTitle>
              <DialogDescription>
                Fill in the patient details and medication information
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="patientName">Patient Name *</Label>
                      <Input
                        id="patientName"
                        value={newPrescription.patientName}
                        onChange={(e) => setNewPrescription(prev => ({ ...prev, patientName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientId">Patient ID *</Label>
                      <Input
                        id="patientId"
                        value={newPrescription.patientId}
                        onChange={(e) => setNewPrescription(prev => ({ ...prev, patientId: e.target.value }))}
                        placeholder="e.g., PAT001"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          value={newPrescription.age}
                          onChange={(e) => setNewPrescription(prev => ({ ...prev, age: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <Select value={newPrescription.gender} onValueChange={(value) => setNewPrescription(prev => ({ ...prev, gender: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vital Signs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Vital Signs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="temperature">Temperature (°F)</Label>
                      <Input
                        id="temperature"
                        value={newPrescription.temperature}
                        onChange={(e) => setNewPrescription(prev => ({ ...prev, temperature: e.target.value }))}
                        placeholder="e.g., 98.6"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bloodPressure">Blood Pressure (mmHg)</Label>
                      <Input
                        id="bloodPressure"
                        value={newPrescription.bloodPressure}
                        onChange={(e) => setNewPrescription(prev => ({ ...prev, bloodPressure: e.target.value }))}
                        placeholder="e.g., 120/80"
                      />
                    </div>
                    <div>
                      <Label htmlFor="symptoms">Symptoms</Label>
                      <Textarea
                        id="symptoms"
                        value={newPrescription.symptoms}
                        onChange={(e) => setNewPrescription(prev => ({ ...prev, symptoms: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="diagnosis">Diagnosis</Label>
                      <Textarea
                        id="diagnosis"
                        value={newPrescription.diagnosis}
                        onChange={(e) => setNewPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Medicines */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Medicines
                    <Button type="button" variant="outline" size="sm" onClick={handleAddMedicine}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Medicine
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newPrescription.medicines.map((medicine, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                        <div>
                          <Label>Medicine Name</Label>
                          <Input
                            value={medicine.name}
                            onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
                            placeholder="e.g., Paracetamol"
                          />
                        </div>
                        <div>
                          <Label>Dosage</Label>
                          <Input
                            value={medicine.dosage}
                            onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
                            placeholder="e.g., 500mg"
                          />
                        </div>
                        <div>
                          <Label>Frequency</Label>
                          <Input
                            value={medicine.frequency}
                            onChange={(e) => handleMedicineChange(index, 'frequency', e.target.value)}
                            placeholder="e.g., Twice daily"
                          />
                        </div>
                        <div>
                          <Label>Duration</Label>
                          <Input
                            value={medicine.duration}
                            onChange={(e) => handleMedicineChange(index, 'duration', e.target.value)}
                            placeholder="e.g., 7 days"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button type="submit">Create Prescription</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Existing Prescriptions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Prescriptions</h2>
        {prescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{prescription.patientName}</h4>
                    <span className="text-sm text-gray-500">ID: {prescription.patientId}</span>
                    <span className="text-sm text-gray-500">Date: {prescription.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Diagnosis: {prescription.diagnosis}</p>
                  <div className="text-sm text-gray-600">
                    <strong>Medicines:</strong>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {prescription.medicines.map((med, index) => (
                        <li key={index}>
                          {med.name} - {med.dosage}, {med.frequency}, {med.duration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Printer className="w-4 h-4 mr-1" />
                    Print
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Prescriptions;

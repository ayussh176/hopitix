
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Calendar, User } from 'lucide-react';

const Prescriptions: React.FC = () => {
  const prescriptions = [
    {
      id: '1',
      doctorName: 'Dr. Johnson',
      specialization: 'General Medicine',
      date: '2024-01-18',
      diagnosis: 'Fever and throat infection',
      symptoms: 'High fever, sore throat, body aches',
      vitals: {
        temperature: '101.2°F',
        bp: '120/80 mmHg',
        pulse: '78 bpm'
      },
      medicines: [
        { name: 'Paracetamol 500mg', dosage: '1 tablet twice daily', duration: '5 days' },
        { name: 'Amoxicillin 250mg', dosage: '1 capsule thrice daily', duration: '7 days' },
        { name: 'Lozenges', dosage: 'As needed', duration: '5 days' }
      ],
      instructions: 'Take complete rest. Drink plenty of fluids. Complete the antibiotic course.',
      status: 'Active',
      followUp: '2024-01-25'
    },
    {
      id: '2',
      doctorName: 'Dr. Smith',
      specialization: 'Endocrinology',
      date: '2024-01-12',
      diagnosis: 'Diabetes Type 2 - Routine Management',
      symptoms: 'Regular checkup for diabetes management',
      vitals: {
        temperature: '98.6°F',
        bp: '130/85 mmHg',
        pulse: '72 bpm'
      },
      medicines: [
        { name: 'Metformin 500mg', dosage: '1 tablet twice daily', duration: '30 days' },
        { name: 'Glimepiride 1mg', dosage: '1 tablet before breakfast', duration: '30 days' }
      ],
      instructions: 'Continue regular exercise. Monitor blood sugar levels daily. Follow diabetic diet.',
      status: 'Completed',
      followUp: '2024-02-12'
    },
    {
      id: '3',
      doctorName: 'Dr. Brown',
      specialization: 'Cardiology',
      date: '2024-01-08',
      diagnosis: 'Hypertension',
      symptoms: 'Mild headaches, occasional dizziness',
      vitals: {
        temperature: '98.4°F',
        bp: '145/90 mmHg',
        pulse: '82 bpm'
      },
      medicines: [
        { name: 'Amlodipine 5mg', dosage: '1 tablet once daily', duration: '30 days' },
        { name: 'Atenolol 25mg', dosage: '1 tablet once daily', duration: '30 days' }
      ],
      instructions: 'Reduce salt intake. Regular walking for 30 minutes daily. Monitor BP regularly.',
      status: 'Active',
      followUp: '2024-02-08'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Prescriptions</h1>
        <p className="text-gray-600 mt-1">View detailed prescriptions from your doctors</p>
      </div>

      <div className="space-y-6">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>{prescription.doctorName}</span>
                  </CardTitle>
                  <p className="text-sm text-gray-600">{prescription.specialization}</p>
                </div>
                <div className="text-right">
                  <Badge className={prescription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {prescription.status}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {prescription.date}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
                    <p className="text-gray-700">{prescription.diagnosis}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Symptoms</h4>
                    <p className="text-gray-700">{prescription.symptoms}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Vital Signs</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600">Temperature</p>
                          <p className="font-medium">{prescription.vitals.temperature}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Blood Pressure</p>
                          <p className="font-medium">{prescription.vitals.bp}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Pulse</p>
                          <p className="font-medium">{prescription.vitals.pulse}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prescribed Medicines</h4>
                    <div className="space-y-3">
                      {prescription.medicines.map((medicine, index) => (
                        <div key={index} className="border border-gray-200 p-3 rounded-lg">
                          <p className="font-medium text-gray-900">{medicine.name}</p>
                          <p className="text-sm text-gray-600">Dosage: {medicine.dosage}</p>
                          <p className="text-sm text-gray-600">Duration: {medicine.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                    <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{prescription.instructions}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Follow-up Date</h4>
                    <p className="text-gray-700">{prescription.followUp}</p>
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

export default Prescriptions;

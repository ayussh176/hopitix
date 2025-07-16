
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { 
  Search,
  Plus,
  Pill,
  DollarSign,
  CheckCircle
} from 'lucide-react';

const MedicineSubstitutes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicineSubstitutes, setMedicineSubstitutes] = useState([
    { 
      id: '1',
      original: 'Paracetamol 500mg', 
      substitute: 'Acetaminophen 500mg', 
      reason: 'Cost effective alternative',
      savings: '30%',
      manufacturer: 'Generic Pharma',
      patientId: 'PAT001',
      patientName: 'Onkar Singh',
      status: 'approved'
    },
    { 
      id: '2',
      original: 'Aspirin 75mg', 
      substitute: 'Ecosprin 75mg', 
      reason: 'Better availability',
      savings: '25%',
      manufacturer: 'USV Ltd',
      patientId: 'PAT002',
      patientName: 'Radha Singh',
      status: 'pending'
    },
    { 
      id: '3',
      original: 'Omeprazole 20mg', 
      substitute: 'Pantoprazole 20mg', 
      reason: 'Similar efficacy, lower cost',
      savings: '40%',
      manufacturer: 'Sun Pharma',
      patientId: 'PAT003',
      patientName: 'Mohan Sharma',
      status: 'approved'
    }
  ]);

  const [newSubstitute, setNewSubstitute] = useState({
    original: '',
    substitute: '',
    reason: '',
    savings: '',
    manufacturer: '',
    patientId: '',
    patientName: ''
  });

  const handleAddSubstitute = (e: React.FormEvent) => {
    e.preventDefault();
    const id = String(medicineSubstitutes.length + 1);
    setMedicineSubstitutes(prev => [...prev, { ...newSubstitute, id, status: 'pending' }]);
    
    toast({
      title: "Substitute Added",
      description: `Medicine substitute suggestion added for ${newSubstitute.patientName}`,
    });

    // Reset form
    setNewSubstitute({
      original: '',
      substitute: '',
      reason: '',
      savings: '',
      manufacturer: '',
      patientId: '',
      patientName: ''
    });
  };

  const handleApproveSubstitute = (id: string) => {
    setMedicineSubstitutes(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: 'approved' } : sub
      )
    );
    
    toast({
      title: "Substitute Approved",
      description: "Medicine substitute has been approved and patient will be notified.",
    });
  };

  const filteredSubstitutes = medicineSubstitutes.filter(substitute =>
    substitute.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
    substitute.substitute.toLowerCase().includes(searchTerm.toLowerCase()) ||
    substitute.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medicine Substitutes</h1>
          <p className="text-gray-600 mt-1">Manage generic medicine alternatives</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Substitute
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Medicine Substitute</DialogTitle>
              <DialogDescription>
                Suggest a generic alternative for a patient's medication
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSubstitute} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    value={newSubstitute.patientName}
                    onChange={(e) => setNewSubstitute(prev => ({ ...prev, patientName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input
                    id="patientId"
                    value={newSubstitute.patientId}
                    onChange={(e) => setNewSubstitute(prev => ({ ...prev, patientId: e.target.value }))}
                    placeholder="e.g., PAT001"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="original">Original Medicine</Label>
                <Input
                  id="original"
                  value={newSubstitute.original}
                  onChange={(e) => setNewSubstitute(prev => ({ ...prev, original: e.target.value }))}
                  placeholder="e.g., Paracetamol 500mg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="substitute">Substitute Medicine</Label>
                <Input
                  id="substitute"
                  value={newSubstitute.substitute}
                  onChange={(e) => setNewSubstitute(prev => ({ ...prev, substitute: e.target.value }))}
                  placeholder="e.g., Acetaminophen 500mg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  value={newSubstitute.manufacturer}
                  onChange={(e) => setNewSubstitute(prev => ({ ...prev, manufacturer: e.target.value }))}
                  placeholder="e.g., Generic Pharma"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="savings">Cost Savings</Label>
                  <Input
                    id="savings"
                    value={newSubstitute.savings}
                    onChange={(e) => setNewSubstitute(prev => ({ ...prev, savings: e.target.value }))}
                    placeholder="e.g., 30%"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="reason">Reason for Substitution</Label>
                <Textarea
                  id="reason"
                  value={newSubstitute.reason}
                  onChange={(e) => setNewSubstitute(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Explain why this substitute is recommended..."
                  rows={3}
                />
              </div>
              <Button type="submit">Add Substitute</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Substitutes</CardTitle>
          <CardDescription>Find medicine substitutes by original medicine, substitute, or patient name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Search medicines or patient names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredSubstitutes.map((substitute) => (
          <Card key={substitute.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="font-medium text-gray-900">{substitute.patientName}</h4>
                    <span className="text-sm text-gray-500">ID: {substitute.patientId}</span>
                    <Badge className={getStatusColor(substitute.status)}>
                      {substitute.status}
                    </Badge>
                    {substitute.savings && (
                      <Badge className="bg-green-100 text-green-800">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {substitute.savings} savings
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Pill className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Original Medicine</span>
                      </div>
                      <p className="text-gray-900 font-medium">{substitute.original}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Pill className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Substitute Medicine</span>
                      </div>
                      <p className="text-green-700 font-medium">{substitute.substitute}</p>
                      {substitute.manufacturer && (
                        <p className="text-sm text-gray-600">by {substitute.manufacturer}</p>
                      )}
                    </div>
                  </div>
                  
                  {substitute.reason && (
                    <div className="mt-3">
                      <span className="text-sm font-medium text-gray-700">Reason: </span>
                      <span className="text-sm text-gray-600">{substitute.reason}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {substitute.status === 'pending' && (
                    <Button size="sm" onClick={() => handleApproveSubstitute(substitute.id)}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
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

export default MedicineSubstitutes;

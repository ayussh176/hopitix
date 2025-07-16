
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { TestTube, Calendar, Clock, MapPin } from 'lucide-react';

const BookPathology: React.FC = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    testType: '',
    preferredDate: '',
    preferredTime: '',
    doctorName: '',
    specialInstructions: '',
    homeCollection: false,
    address: '',
    fastingRequired: false
  });

  const availableTests = [
    { value: 'cbc', label: 'Complete Blood Count (CBC)', price: '₹500' },
    { value: 'lft', label: 'Liver Function Test (LFT)', price: '₹800' },
    { value: 'kft', label: 'Kidney Function Test (KFT)', price: '₹700' },
    { value: 'thyroid', label: 'Thyroid Profile', price: '₹900' },
    { value: 'lipid', label: 'Lipid Profile', price: '₹600' },
    { value: 'diabetes', label: 'Diabetes Panel', price: '₹1200' },
    { value: 'cardiac', label: 'Cardiac Markers', price: '₹1500' },
    { value: 'vitamin', label: 'Vitamin Profile', price: '₹2000' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.testType || !formData.preferredDate || !formData.preferredTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pathology test booked successfully!",
      description: "You will receive a confirmation call within 2 hours."
    });

    // Reset form
    setFormData({
      testType: '',
      preferredDate: '',
      preferredTime: '',
      doctorName: '',
      specialInstructions: '',
      homeCollection: false,
      address: '',
      fastingRequired: false
    });
  };

  const selectedTest = availableTests.find(test => test.value === formData.testType);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Book Pathology Test</h1>
        <p className="text-gray-600 mt-1">Schedule your laboratory tests with ease</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TestTube className="w-5 h-5 text-purple-600" />
                <span>Test Booking Form</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="testType">Select Test Type *</Label>
                  <Select value={formData.testType} onValueChange={(value) => setFormData(prev => ({ ...prev, testType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a pathology test" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTests.map((test) => (
                        <SelectItem key={test.value} value={test.value}>
                          {test.label} - {test.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="preferredTime">Preferred Time *</Label>
                    <Select value={formData.preferredTime} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="doctorName">Referring Doctor (Optional)</Label>
                  <Input
                    id="doctorName"
                    placeholder="Enter doctor's name who referred this test"
                    value={formData.doctorName}
                    onChange={(e) => setFormData(prev => ({ ...prev, doctorName: e.target.value }))}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="homeCollection"
                    checked={formData.homeCollection}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, homeCollection: !!checked }))}
                  />
                  <Label htmlFor="homeCollection">Request home sample collection (+₹200)</Label>
                </div>

                {formData.homeCollection && (
                  <div>
                    <Label htmlFor="address">Collection Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete address for sample collection"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fastingRequired"
                    checked={formData.fastingRequired}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, fastingRequired: !!checked }))}
                  />
                  <Label htmlFor="fastingRequired">This test requires fasting (12+ hours)</Label>
                </div>

                <div>
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    placeholder="Any special requirements or instructions..."
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  <TestTube className="w-4 h-4 mr-2" />
                  Book Pathology Test
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {selectedTest && (
            <Card>
              <CardHeader>
                <CardTitle>Test Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">{selectedTest.label}</p>
                    <p className="text-lg font-bold text-purple-600">{selectedTest.price}</p>
                  </div>
                  {formData.homeCollection && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">Home collection: +₹200</p>
                    </div>
                  )}
                  {formData.fastingRequired && (
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-sm text-orange-800">⚠️ Fasting required for this test</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Calendar className="w-4 h-4 text-blue-600 mt-1" />
                <p>Tests are available Monday to Saturday</p>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-green-600 mt-1" />
                <p>Reports will be ready within 24-48 hours</p>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-purple-600 mt-1" />
                <p>Home collection available in selected areas</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookPathology;

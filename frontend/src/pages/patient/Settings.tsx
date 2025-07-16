
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, Palette, Bell } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [personalDetails, setPersonalDetails] = useState({
    name: user?.name || 'Ram',
    email: user?.email || '',
    phone: '',
    occupation: '',
    gender: '',
    dateOfBirth: '',
    maritalStatus: '',
    address: '',
    emergencyContact: ''
  });

  const [medicalHistory, setMedicalHistory] = useState({
    chronicDiseases: '',
    allergies: '',
    medications: '',
    familyHistory: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    emailAlerts: true,
    smsAlerts: false
  });

  const handlePersonalDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Personal details updated",
      description: "Your personal information has been saved successfully."
    });
  };

  const handleMedicalHistorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Medical history updated",
      description: "Your medical information has been saved successfully."
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handlePreferencesChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Preferences updated",
      description: "Your settings have been saved."
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <span>Personal Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePersonalDetailsSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={personalDetails.name}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={personalDetails.phone}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={personalDetails.occupation}
                    onChange={(e) => setPersonalDetails(prev => ({ ...prev, occupation: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={personalDetails.gender} onValueChange={(value) => setPersonalDetails(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select value={personalDetails.maritalStatus} onValueChange={(value) => setPersonalDetails(prev => ({ ...prev, maritalStatus: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={personalDetails.dateOfBirth}
                  onChange={(e) => setPersonalDetails(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={personalDetails.address}
                  onChange={(e) => setPersonalDetails(prev => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <Button type="submit" className="w-full">Save Personal Details</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-red-600" />
                <span>Change Password</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>
                <Button type="submit" className="w-full">Change Password</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-purple-600" />
                <span>Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <Switch
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => handlePreferencesChange('darkMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-600">Receive app notifications</p>
                </div>
                <Switch
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => handlePreferencesChange('notifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Alerts</Label>
                  <p className="text-sm text-gray-600">Receive email notifications</p>
                </div>
                <Switch
                  checked={preferences.emailAlerts}
                  onCheckedChange={(checked) => handlePreferencesChange('emailAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS Alerts</Label>
                  <p className="text-sm text-gray-600">Receive SMS notifications</p>
                </div>
                <Switch
                  checked={preferences.smsAlerts}
                  onCheckedChange={(checked) => handlePreferencesChange('smsAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleMedicalHistorySubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="chronicDiseases">Chronic Diseases</Label>
                <Textarea
                  id="chronicDiseases"
                  placeholder="List any chronic conditions..."
                  value={medicalHistory.chronicDiseases}
                  onChange={(e) => setMedicalHistory(prev => ({ ...prev, chronicDiseases: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  placeholder="List any known allergies..."
                  value={medicalHistory.allergies}
                  onChange={(e) => setMedicalHistory(prev => ({ ...prev, allergies: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="medications">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="List current medications..."
                  value={medicalHistory.medications}
                  onChange={(e) => setMedicalHistory(prev => ({ ...prev, medications: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="familyHistory">Family Medical History</Label>
                <Textarea
                  id="familyHistory"
                  placeholder="Any relevant family medical history..."
                  value={medicalHistory.familyHistory}
                  onChange={(e) => setMedicalHistory(prev => ({ ...prev, familyHistory: e.target.value }))}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">Save Medical History</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

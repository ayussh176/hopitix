
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, User, Lock, Palette, Bell } from 'lucide-react';

const DoctorSettings: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Dr. Sharma',
    email: 'doctor@demo.com',
    phone: '0987654321',
    specialization: 'Cardiology',
    department: 'Internal Medicine',
    licenseNo: 'DOC12345',
    qualification: 'MBBS, MD',
    experience: '10 years'
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your personal information has been updated successfully.",
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirm password don't match.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Preferences Updated",
      description: "Your preferences have been saved successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <SettingsIcon className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={personalInfo.specialization}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, specialization: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={personalInfo.department}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, department: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="licenseNo">License Number</Label>
                <Input
                  id="licenseNo"
                  value={personalInfo.licenseNo}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, licenseNo: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="qualification">Qualification</Label>
                <Input
                  id="qualification"
                  value={personalInfo.qualification}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, qualification: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={personalInfo.experience}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, experience: e.target.value }))}
                />
              </div>
              <Button type="submit">Update Profile</Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Change Password</span>
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
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
              <Button type="submit">Change Password</Button>
            </form>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Preferences</span>
            </CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePreferencesSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-sm text-gray-500">Switch to dark theme</p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={preferences.darkMode}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, darkMode: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive email updates</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive SMS alerts</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={preferences.smsNotifications}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="appointmentReminders">Appointment Reminders</Label>
                      <p className="text-sm text-gray-500">Get reminded of appointments</p>
                    </div>
                    <Switch
                      id="appointmentReminders"
                      checked={preferences.appointmentReminders}
                      onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, appointmentReminders: checked }))}
                    />
                  </div>
                </div>
              </div>
              <Button type="submit">Save Preferences</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorSettings;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, ArrowLeft, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const DoctorSignup: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    department: '',
    gender: '',
    dateOfBirth: '',
    licenseNo: '',
    profileNo: '',
    qualification: '',
    assignedDoctor: '', // for assistants
    idProof: null as File | null
  });

  const mockDoctors = [
    'Dr. Smith (Cardiology)',
    'Dr. Johnson (Neurology)', 
    'Dr. Williams (Orthopedics)',
    'Dr. Brown (Pediatrics)'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, idProof: file }));
    }
  };

  const validateForm = () => {
    const { role, firstName, lastName, email, phone, password, confirmPassword, department } = formData;
    
    if (!role || !firstName || !lastName || !email || !phone || !password || !department) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error", 
        description: "Passwords do not match",
        variant: "destructive"
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return false;
    }

    if (role === 'assistant' && !formData.assignedDoctor) {
      toast({
        title: "Error",
        description: "Please select an assigned doctor",
        variant: "destructive"
      });
      return false;
    }

    if ((role === 'doctor' || role === 'pathology') && (!formData.licenseNo || !formData.qualification)) {
      toast({
        title: "Error",
        description: "License number and qualification are required",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await register(formData, formData.role as any);
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to HealthAI"
        });
        
        // Navigate based on role
        const roleRoutes = {
          doctor: '/dashboard/doctor',
          assistant: '/dashboard/assistant',
          pathology: '/dashboard/pathology'
        };
        navigate(roleRoutes[formData.role as keyof typeof roleRoutes]);
      } else {
        toast({
          title: "Registration failed",
          description: "Please try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <Link to="/auth/signup" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to role selection
          </Link>
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Healthcare Provider Registration</h1>
          <p className="text-gray-600 mt-2">Join our medical team</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>
              Please provide your professional details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="pathology">Pathologist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>
              </div>

              {formData.role === 'doctor' && (
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Input
                    id="specialization"
                    type="text"
                    placeholder="Cardiology"
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="radiology">Radiology</SelectItem>
                    <SelectItem value="pathology">Pathology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'assistant' && (
                <div className="space-y-2">
                  <Label htmlFor="assignedDoctor">Assigned Doctor *</Label>
                  <Select value={formData.assignedDoctor} onValueChange={(value) => handleInputChange('assignedDoctor', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assigned doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockDoctors.map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
              </div>

              {(formData.role === 'doctor' || formData.role === 'pathology') && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNo">License Number *</Label>
                      <Input
                        id="licenseNo"
                        type="text"
                        placeholder="MD123456"
                        value={formData.licenseNo}
                        onChange={(e) => handleInputChange('licenseNo', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profileNo">Profile Number</Label>
                      <Input
                        id="profileNo"
                        type="text"
                        placeholder="PRO789"
                        value={formData.profileNo}
                        onChange={(e) => handleInputChange('profileNo', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification *</Label>
                    <Input
                      id="qualification"
                      type="text"
                      placeholder="MBBS, MD"
                      value={formData.qualification}
                      onChange={(e) => handleInputChange('qualification', e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="idProof">ID Proof Upload</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <Label htmlFor="idProof" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700">Click to upload</span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </Label>
                  <Input
                    id="idProof"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.idProof && (
                    <p className="text-sm text-green-600 mt-2">
                      File selected: {formData.idProof.name}
                    </p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;

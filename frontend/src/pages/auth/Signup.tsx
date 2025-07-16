
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Stethoscope, UserPlus, TestTube } from 'lucide-react';

const Signup: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | null>(null);

  const roleOptions = [
    {
      role: 'patient' as const,
      title: 'Patient',
      description: 'Book appointments, chat with AI, manage your health',
      icon: Heart,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-50 hover:border-green-200'
    },
    {
      role: 'doctor' as const,
      title: 'Healthcare Provider',
      description: 'Doctor, Assistant, or Pathologist registration',
      icon: Stethoscope,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-50 hover:border-blue-200'
    }
  ];

  if (selectedRole) {
    // Redirect to specific signup form based on role
    if (selectedRole === 'patient') {
      window.location.href = '/auth/signup/patient';
    } else {
      window.location.href = '/auth/signup/doctor';
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join HealthAI</h1>
          <p className="text-gray-600 mt-2">Choose your account type to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {roleOptions.map((option) => (
            <Card 
              key={option.role}
              className={`cursor-pointer transition-all duration-200 border-2 ${option.hoverColor} hover:shadow-lg`}
              onClick={() => setSelectedRole(option.role)}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto w-12 h-12 ${option.color} rounded-xl flex items-center justify-center mb-4`}>
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                <CardDescription className="text-center">
                  {option.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button className="w-full">
                  Continue as {option.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

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

export default Signup;

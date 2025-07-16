import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Mail, Phone, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Navigate to dashboard when user is authenticated
  useEffect(() => {
    if (user) {
      const dashboardPaths = {
        patient: '/dashboard/patient',
        doctor: '/dashboard/doctor',
        assistant: '/dashboard/assistant',
        pathology: '/dashboard/pathology'
      };
      navigate(dashboardPaths[user.role] || '/dashboard/patient');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(identifier, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "Login successful"
        });
        // Navigation will be handled by the useEffect above
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Try demo: patient@demo.com / demo123",
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

  const getIcon = () => {
    if (identifier.includes('@')) return <Mail className="w-4 h-4" />;
    if (identifier.match(/^\d+$/)) return <Phone className="w-4 h-4" />;
    return <User className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to access your health dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your email, phone number, or username
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Email / Phone / Username</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    {getIcon()}
                  </div>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Enter your email, phone, or username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </div>

              <div className="border-t pt-4">
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="font-medium">Demo Accounts:</div>
                  <div>Patient: patient@demo.com / demo123</div>
                  <div>Doctor: doctor@demo.com / demo123</div>
                  <div>Assistant: assistant@demo.com / demo123</div>
                  <div>Pathology: pathology@demo.com / demo123</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

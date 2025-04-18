
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { forgotPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsEmailSent(true);
      toast({
        title: "Reset email sent",
        description: "Check your inbox for password reset instructions",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send password reset email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl font-bold text-center text-sewasetu-primary mb-2">SewaSetu</h1>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        {!isEmailSent ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sewasetu-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="sewasetu-btn-primary w-full flex justify-center"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="mb-4 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">
                If an account with this email exists, you'll receive a password reset link shortly.
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Check your spam folder if you don't see it in your inbox.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/login" className="font-medium text-sewasetu-primary hover:text-sewasetu-primary/90">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;

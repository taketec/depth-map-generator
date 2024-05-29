import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../apis/auth';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    // Validate password and confirmation match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await registerUser({ email, password });
      if (response.data?.token) {
        localStorage.setItem('userToken', response.data.token);
        navigate('/dashboard');
      } else {
        setErrorMessage(response.error || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful Google login
  const handleGoogleSuccess = (response) => {
    console.log('Google login successful:', response);
    // Handle the response as needed (e.g., authenticate user, navigate to a page)
  };

  // Handle failed Google login
  const handleGoogleFailure = (response) => {
    console.error('Google login failed:', response);
    // setErrorMessage('Google login failed. Please try again.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2c2f33]">
      <div className="w-full max-w-md p-8 space-y-3 rounded-lg bg-[#36393f]">
        <h1 className="text-2xl font-bold text-center text-[#ffffff]">Register</h1>
        {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-[#b9bbbe]">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#202225] border border-[#202225] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#7289da]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-[#b9bbbe]">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#202225] border border-[#202225] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#7289da]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-[#b9bbbe]">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#202225] border border-[#202225] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#7289da]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-3 py-2 rounded-lg bg-[#7289da] text-white font-medium hover:bg-[#677bc4] ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-[#b9bbbe] text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#7289da] underline">
            Sign in
          </Link>
        </p>

        <div className="text-center mt-4 text-[#b9bbbe]">
          <p>Or</p>
        </div>
      </div>
    </div>
  );
};

export default Register;

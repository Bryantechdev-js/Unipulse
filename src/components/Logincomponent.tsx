"use client";

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

function Logincomponent() {
   const [currentPage, setCurrentPage] = useState('login');
  const [userRole, setUserRole] = useState('student');
  return (
    <div>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Login to UniPulse
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please enter your details.
        </p>
        
        <form className="space-y-4" >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="john.doe@unipulse.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white"
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="text-right">
            <a href="#" className="text-sm text-red-700 hover:text-red-800">
              Forgot password?
            </a>
          </div>
          
          <button
            type="button"
            onClick={() => setCurrentPage(userRole === 'staff' ? 'staff-dashboard' : 'issue-submission')}
            className="w-full bg-red-700 text-white py-2.5 rounded-lg hover:bg-red-800 transition-colors font-medium"
          >
            Login
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '} <a href="/register" className='text-red-200'>Register</a>
        </p>
        <p className="text-center text-sm text-gray-600 mt-2">
          <a href="#" className="text-gray-600 hover:text-gray-900 underline">
            Contact admin
          </a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Logincomponent;

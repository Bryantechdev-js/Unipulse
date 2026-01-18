"use client";

import { BookOpen } from 'lucide-react';
import React, { useState } from 'react';

function Registercomponent() {
       const [currentPage, setCurrentPage] = useState('login');

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
          Create Your UniPulse Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your data is securely stored by the university.
        </p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your university email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a secure password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white">
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Matricule
            </label>
            <input
              type="text"
              placeholder="e.g., S12345"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white">
              <option value="">Select your academic level</option>
              <option value="100">Level 100</option>
              <option value="200">Level 200</option>
              <option value="300">Level 300</option>
              <option value="400">Level 400</option>
            </select>
          </div>
          
          <button
            type="button"
            onClick={() => setCurrentPage('login')}
            className="w-full bg-red-700 text-white py-2.5 rounded-lg hover:bg-red-800 transition-colors font-medium"
          >
            Register Account
          </button>
        </form>
        
        <div className="text-center my-4">
          <span className="text-gray-500 text-sm">OR</span>
        </div>
        
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '} <a href="/login" className='text-red-200'>Login</a>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Registercomponent;


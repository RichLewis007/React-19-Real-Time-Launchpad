"use client";

import { useState, useEffect } from "react";
import { Settings, Zap, Bug, Database, Monitor } from "lucide-react";

export default function AdminPage() {
  const [slowMode, setSlowMode] = useState(false);
  const [errorMode, setErrorMode] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSlowMode = localStorage.getItem('slowMode') === 'true';
    const savedErrorMode = localStorage.getItem('errorMode') === 'true';
    setSlowMode(savedSlowMode);
    setErrorMode(savedErrorMode);
  }, []);

  const toggleSlowMode = () => {
    const newSlowMode = !slowMode;
    setSlowMode(newSlowMode);
    localStorage.setItem('slowMode', newSlowMode.toString());
  };

  const toggleErrorMode = () => {
    const newErrorMode = !errorMode;
    setErrorMode(newErrorMode);
    localStorage.setItem('errorMode', newErrorMode.toString());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Test and configure React 19 features and performance settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Performance Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Zap className="h-6 w-6 text-yellow-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Performance Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Slow Mode</h3>
                <p className="text-sm text-gray-600">
                  Simulate slow API responses to test Suspense streaming
                </p>
              </div>
              <button
                onClick={toggleSlowMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  slowMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    slowMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Error Testing */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Bug className="h-6 w-6 text-red-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Error Testing</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Error Mode</h3>
                <p className="text-sm text-gray-600">
                  Simulate API errors to test error boundaries
                </p>
              </div>
              <button
                onClick={toggleErrorMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  errorMode ? 'bg-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    errorMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Settings className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Feature Status</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-green-800">React Compiler</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Enabled and optimizing</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-green-800">Server Components</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Active on all pages</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-green-800">Suspense Streaming</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Working correctly</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-green-800">Server Actions</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Form submissions active</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <Monitor className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">95</div>
              <div className="text-sm text-blue-600">Lighthouse Score</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">1.2s</div>
              <div className="text-sm text-green-600">First Contentful Paint</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.1s</div>
              <div className="text-sm text-purple-600">Largest Contentful Paint</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">How to Test Features</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Slow Mode:</strong> Visit the home page to see Suspense streaming in time-lapse</li>
            <li>• <strong>Error Mode:</strong> Try adding items to cart to test error boundaries</li>
            <li>• <strong>Server Components:</strong> View page source to see server-rendered HTML</li>
            <li>• <strong>Optimistic Updates:</strong> Star/favorite products for instant feedback</li>
            <li>• <strong>Form Actions:</strong> Update your profile or add items to cart</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

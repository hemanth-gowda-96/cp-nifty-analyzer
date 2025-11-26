// app/docs/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Suppress React warnings for third-party components in development
if (process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('UNSAFE_componentWillReceiveProps')
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

// Dynamically import SwaggerWrapper to avoid SSR issues and lifecycle warnings
const SwaggerWrapper = dynamic(() => import('../../components/swagger-wrapper'), {
  ssr: false,
  loading: () => <div className="p-8">Loading API Documentation...</div>,
});

export default function ApiDocsPage() {
  const [spec, setSpec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const response = await fetch('/api/docs');
        if (!response.ok) {
          throw new Error('Failed to fetch API specification');
        }
        const swaggerSpec = await response.json();
        setSpec(swaggerSpec);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSpec();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading API Documentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error Loading Documentation</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">CP Nifty Analyzer API Documentation</h1>
          <p className="text-blue-100 mt-2">
            Interactive API documentation for NSE Option Chain Analysis
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {spec && (
          <SwaggerWrapper
            spec={spec}
            docExpansion="list"
            deepLinking={true}
            displayRequestDuration={true}
            tryItOutEnabled={true}
          />
        )}
      </div>
    </div>
  );
}
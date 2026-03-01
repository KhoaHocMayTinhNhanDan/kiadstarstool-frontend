// api/_middleware.js - Vercel Edge Middleware
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Clone the response
  const response = NextResponse.next();
  
  // Add CORS headers to ALL responses
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: response.headers
    });
  }
  
  return response;
}

// Apply middleware to all API routes
export const config = {
  matcher: '/api/:path*',
};
// lib/firebase-admin-init.ts
import admin, { type ServiceAccount } from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Tải biến môi trường từ file .env trong thư mục gốc của backend_vercel
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
} as ServiceAccount;

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
} catch (e) {
  console.error('Firebase admin initialization error', e);
}

export default admin;

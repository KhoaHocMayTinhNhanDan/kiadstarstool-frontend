// frontend/scripts/backup-firestore.js
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Cấu hình môi trường
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Khởi tạo Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Danh sách các collection cần backup
const COLLECTIONS = [
  'users',
  'branches',
  'classes',
  'students',
  'attendances',
  'transactions',
  'activities'
];

async function backup() {
  console.log('📦 Đang bắt đầu backup dữ liệu...');
  const backupData = {};

  for (const collectionName of COLLECTIONS) {
    console.log(`   - Đang tải collection: ${collectionName}...`);
    const snapshot = await db.collection(collectionName).get();
    
    backupData[collectionName] = {};
    snapshot.forEach(doc => {
      // Lưu dữ liệu với key là doc.id
      backupData[collectionName][doc.id] = doc.data();
    });
    console.log(`     ✅ Đã tải ${snapshot.size} documents.`);
  }

  const backupPath = path.resolve(__dirname, '../backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
  console.log(`\n🎉 Backup hoàn tất! File lưu tại: ${backupPath}`);
}

backup().catch(console.error);

// frontend/scripts/restore-firestore.js
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

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

// Hàm đệ quy để khôi phục Firestore Timestamp từ JSON object
const restoreTimestamps = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;

  // Nếu gặp object dạng {_seconds, _nanoseconds} -> Chuyển thành Timestamp
  if (obj._seconds !== undefined && obj._nanoseconds !== undefined && Object.keys(obj).length === 2) {
    return new admin.firestore.Timestamp(obj._seconds, obj._nanoseconds);
  }

  // Nếu là mảng
  if (Array.isArray(obj)) {
    return obj.map(restoreTimestamps);
  }

  // Nếu là object thường -> Duyệt qua các key
  const newObj = {};
  for (const key in obj) {
    newObj[key] = restoreTimestamps(obj[key]);
  }
  return newObj;
};

async function restore() {
  const backupPath = path.resolve(__dirname, '../backup.json');
  
  if (!fs.existsSync(backupPath)) {
    console.error('❌ Không tìm thấy file backup.json!');
    process.exit(1);
  }

  console.log('♻️  Đang bắt đầu khôi phục dữ liệu...');
  const rawData = fs.readFileSync(backupPath, 'utf8');
  const backupData = JSON.parse(rawData);

  for (const [collectionName, documents] of Object.entries(backupData)) {
    console.log(`   - Đang khôi phục collection: ${collectionName}...`);
    
    const batchSize = 400; // Firestore giới hạn 500 thao tác/batch
    let batch = db.batch();
    let count = 0;
    let total = 0;

    for (const [docId, docData] of Object.entries(documents)) {
      const docRef = db.collection(collectionName).doc(docId);
      
      // Khôi phục Timestamp và ghi đè dữ liệu
      const cleanData = restoreTimestamps(docData);
      batch.set(docRef, cleanData);
      
      count++;
      total++;

      if (count >= batchSize) {
        await batch.commit();
        console.log(`     ...đã ghi ${total} documents`);
        batch = db.batch();
        count = 0;
      }
    }

    if (count > 0) {
      await batch.commit();
    }
    console.log(`     ✅ Hoàn tất ${collectionName}: ${total} documents.`);
  }

  console.log('\n🎉 Restore hoàn tất!');
}

restore().catch(console.error);

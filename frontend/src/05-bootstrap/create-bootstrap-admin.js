// scripts/create-admin.js
/*
 * Script này dùng để tạo tài khoản Admin đầu tiên trên Firebase Auth & Firestore
 * Chạy bằng lệnh: node scripts/create-admin.js
 * Yêu cầu: Đã tải Service Account Key từ Firebase Console
 */

// Sử dụng cú pháp ES Module 'import' thay cho 'require'
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
// Import file JSON với import assertion
// Bỏ import trực tiếp file JSON để tăng cường bảo mật
// import serviceAccount from '../service-account-key.json' assert { type: 'json' };

// Tái tạo lại biến __dirname vì nó không có sẵn trong ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

// Lấy thông tin cấu hình Firebase từ biến môi trường
// Điều này an toàn hơn là import trực tiếp file service-account-key.json
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  // Thay thế `\n` trong private key bằng newline thật
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Kiểm tra xem các biến môi trường Firebase đã được load chưa, nếu thiếu thì báo lỗi và thoát
if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  console.error('Lỗi: Vui lòng định nghĩa các biến FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, và FIREBASE_ADMIN_PRIVATE_KEY trong file .env.local');
  console.error('Bạn có thể lấy các giá trị này từ file service account key của Firebase.');
  process.exit(1);
}

// 1. Khởi tạo Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

// Đọc thông tin từ biến môi trường
const ROOT_USER = {
  email: process.env.VITE_ADMIN_EMAIL,
  password: process.env.VITE_ADMIN_PASSWORD,
  displayName: 'Super Admin'
};

async function bootstrapRootUser() {
  try {
    // 2. Kiểm tra biến môi trường đã được load chưa
    if (!ROOT_USER.email || !ROOT_USER.password) {
      console.error('Lỗi: Vui lòng định nghĩa VITE_ADMIN_EMAIL và VITE_ADMIN_PASSWORD trong file .env.local');
      process.exit(1); // Dừng script nếu thiếu biến
    }

    // 3. Kiểm tra xem user đã tồn tại chưa
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(ROOT_USER.email);
      console.log('User đã tồn tại:', userRecord.uid);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        // 4. Nếu chưa, tạo mới
        userRecord = await auth.createUser({
          email: ROOT_USER.email,
          password: ROOT_USER.password,
          displayName: ROOT_USER.displayName,
          emailVerified: true
        });
        console.log('Đã tạo user mới:', userRecord.uid);
      } else {
        throw e;
      }
    }

    // 5. Gán Custom Claims (Quan trọng: Đây là bước biến user thành Admin)
    await auth.setCustomUserClaims(userRecord.uid, { 
      roles: ['admin'],
      permissions: ['*'] // Wildcard permission
    });
    console.log('Đã gán quyền Admin (Custom Claims)');

    // 6. Tạo User Profile trong Firestore (để hiển thị trên UI)
    await db.collection('users').doc(userRecord.uid).set({
      id: userRecord.uid,
      email: ROOT_USER.email,
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: ['*'],
      profile: {
        kind: 'admin',
        displayName: ROOT_USER.displayName,
        photoURL: '',
        phoneNumbers: [], // Bổ sung trường này để khớp với AdminProfile.vo.ts
        adminLevel: 1,
        managedBranches: []
      }
    }, { merge: true });
    
    console.log('Đã tạo User Profile trong Database');
    console.log('✅ HOÀN TẤT! Bạn có thể đăng nhập bằng:', ROOT_USER.email);

  } catch (error) {
    console.error('Lỗi:', error);
  }
}

bootstrapRootUser();

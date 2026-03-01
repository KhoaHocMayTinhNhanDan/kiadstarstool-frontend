// scripts/create-admin.js
/*
 * Script này dùng để tạo tài khoản Admin đầu tiên trên Firebase Auth & Firestore
 * Chạy bằng lệnh: node scripts/create-admin.js
 * Yêu cầu: Đã tải Service Account Key từ Firebase Console
 */

const admin = require('firebase-admin');
const serviceAccount = require('../service-account-key.json'); // Tải từ Firebase Console

// 1. Khởi tạo Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

const ROOT_USER = {
  email: 'admin@kiadstars.com',
  password: 'StrongPassword123!',
  displayName: 'Super Admin'
};

async function bootstrapRootUser() {
  try {
    // 2. Kiểm tra xem user đã tồn tại chưa
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(ROOT_USER.email);
      console.log('User đã tồn tại:', userRecord.uid);
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        // 3. Nếu chưa, tạo mới
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

    // 4. Gán Custom Claims (Quan trọng: Đây là bước biến user thành Admin)
    await auth.setCustomUserClaims(userRecord.uid, { 
      roles: ['admin'],
      permissions: ['*'] // Wildcard permission
    });
    console.log('Đã gán quyền Admin (Custom Claims)');

    // 5. Tạo User Profile trong Firestore (để hiển thị trên UI)
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

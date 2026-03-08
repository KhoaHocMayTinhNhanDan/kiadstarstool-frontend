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

async function migrate() {
  console.log('🚀 Bắt đầu migration branchIds cho collection "students"...');
  const studentsRef = db.collection('students');
  const snapshot = await studentsRef.get();

  if (snapshot.empty) {
    console.log('Không có học viên nào để migrate.');
    return;
  }

  const batch = db.batch();
  let count = 0;
  let totalUpdated = 0;

  snapshot.forEach(doc => {
    const data = doc.data();
    const enrollments = data.enrollments || [];
    
    // Tính toán branchIds từ enrollments
    const branchIds = [...new Set(enrollments.map(e => e.branchId).filter(Boolean))];

    // Kiểm tra xem cần update không (nếu chưa có branchIds hoặc branchIds không khớp)
    const currentBranchIds = data.branchIds || [];
    const isDifferent = 
      branchIds.length !== currentBranchIds.length || 
      !branchIds.every(id => currentBranchIds.includes(id));

    if (isDifferent) {
      batch.update(doc.ref, { branchIds: branchIds });
      count++;
      totalUpdated++;
      console.log(`  - Cập nhật branchIds cho: ${data.name} (${doc.id}) -> [${branchIds.join(', ')}]`);
    }

    // Firestore giới hạn 500 operations mỗi batch
    if (count >= 400) {
      batch.commit().then(() => console.log(`    ...Đã commit ${count} thay đổi.`));
      count = 0; // Reset counter cho batch mới (lưu ý: logic này đơn giản hóa, thực tế cần await batch.commit() trong loop hoặc chia chunk mảng snapshot)
      // Trong script đơn giản này, ta sẽ commit batch hiện tại và tạo batch mới, 
      // nhưng đúng ra nên gom mảng promise. 
      // Để an toàn và đơn giản cho script chạy 1 lần, ta sẽ commit cuối cùng nếu số lượng ít.
      // Nếu số lượng nhiều > 500, cần chia mảng snapshot thành các chunk.
    }
  });

  if (count > 0) {
    await batch.commit();
    console.log(`\n✅ Hoàn tất! Đã cập nhật ${totalUpdated} học viên.`);
  } else {
    console.log('\n✅ Tất cả học viên đã có branchIds chính xác.');
  }
}

// Hàm chia chunk để xử lý số lượng lớn (nếu cần)
async function migrateLargeData() {
    console.log('🚀 Bắt đầu migration branchIds (Large Data Mode)...');
    const studentsRef = db.collection('students');
    const snapshot = await studentsRef.get();
    
    const docs = snapshot.docs;
    const chunkSize = 400;
    
    for (let i = 0; i < docs.length; i += chunkSize) {
        const chunk = docs.slice(i, i + chunkSize);
        const batch = db.batch();
        let hasUpdate = false;

        chunk.forEach(doc => {
            const data = doc.data();
            const enrollments = data.enrollments || [];
            const branchIds = [...new Set(enrollments.map(e => e.branchId).filter(Boolean))];
            
            // Luôn update để đảm bảo đồng bộ, hoặc check diff như trên
            batch.update(doc.ref, { branchIds: branchIds }, { merge: true });
            hasUpdate = true;
        });

        if (hasUpdate) {
            await batch.commit();
            console.log(`✅ Đã xử lý batch ${i / chunkSize + 1} (${chunk.length} docs)`);
        }
    }
    console.log('🎉 Migration hoàn tất!');
}

migrateLargeData().catch(console.error);

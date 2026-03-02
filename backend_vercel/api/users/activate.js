import admin from '../../lib/firebase-admin-init';

/**
 * Vercel Serverless Function để kích hoạt tài khoản người dùng Firebase.
 * Endpoint: /api/users/activate
 * Method: POST
 * Body: { "userId": "uid-to-activate" }
 * Authorization: Bearer <ADMIN_ID_TOKEN> (Khuyến khích)
 */
export default async function handler(req, res) {
  // 1. Chỉ cho phép phương thức POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // --- (Tùy chọn nhưng Rất Khuyến khích) Kiểm tra quyền Admin ---
    // Xác thực rằng request được gửi từ một admin đã đăng nhập.
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    const idToken = authorization.split('Bearer ')[1];

    // Xác thực token và kiểm tra quyền admin.
    // Đây là ví dụ, bạn nên có logic kiểm tra quyền của riêng mình,
    // ví dụ: kiểm tra custom claim `role: 'admin'`.
    // const decodedToken = await admin.auth().verifyIdToken(idToken);
    // if (decodedToken.role !== 'admin') {
    //   throw new Error('Permission denied: Not an admin');
    // }
    await admin.auth().verifyIdToken(idToken); // Xác thực token là đủ trong ví dụ này
    // --- Kết thúc kiểm tra quyền ---

    // 2. Lấy userId từ request body
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Bad Request: "userId" is required in the request body.' });
    }

    // 3. Dùng Firebase Admin SDK để cập nhật người dùng
    // Việc đặt `disabled: false` sẽ kích hoạt tài khoản.
    await admin.auth().updateUser(userId, {
      disabled: false,
    });

    // 4. Trả về phản hồi thành công
    return res.status(200).json({
      success: true,
      message: `User with ID "${userId}" has been activated successfully.`,
    });
  } catch (error) {
    console.error('Error activating user:', error);

    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ error: `User with ID "${req.body.userId}" not found.` });
    }
    if (error.code === 'auth/invalid-id-token' || error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
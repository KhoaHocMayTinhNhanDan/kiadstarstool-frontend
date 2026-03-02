import admin from '../../lib/firebase-admin-init';

/**
 * Vercel Serverless Function để vô hiệu hóa (block) tài khoản người dùng Firebase.
 * Endpoint: /api/users/block
 * Method: POST
 * Body: { "userId": "uid-to-block" }
 * Authorization: Bearer <ADMIN_ID_TOKEN>
 */
export default async function handler(req, res) {
  // 1. Chỉ cho phép phương thức POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Kiểm tra quyền Admin (Authorization)
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }
    const idToken = authorization.split('Bearer ')[1];

    // Xác thực token
    // Trong thực tế, bạn nên kiểm tra thêm custom claim (ví dụ: role === 'admin')
    await admin.auth().verifyIdToken(idToken);

    // 3. Lấy userId từ request body
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Bad Request: "userId" is required.' });
    }

    // 4. Vô hiệu hóa người dùng (disabled: true)
    // Hành động này sẽ chặn người dùng đăng nhập mới và thu hồi refresh token.
    await admin.auth().updateUser(userId, {
      disabled: true,
    });

    // Thu hồi refresh token để đăng xuất người dùng khỏi các thiết bị khác ngay lập tức (tùy chọn nhưng khuyến khích)
    await admin.auth().revokeRefreshTokens(userId);

    return res.status(200).json({
      success: true,
      message: `User with ID "${userId}" has been blocked successfully.`,
    });

  } catch (error) {
    console.error('Error blocking user:', error);

    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ error: `User with ID "${req.body.userId}" not found.` });
    }
    if (error.code === 'auth/invalid-id-token' || error.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
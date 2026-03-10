// api/sign-upload.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import cloudinary from '../lib/cloudinary';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Cấu hình CORS để Frontend (localhost:5173) có thể gọi được
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Trong production nên thay '*' bằng domain frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!apiSecret) {
      console.error('[sign-upload] Critical Error: CLOUDINARY_API_SECRET is not set in environment variables.');
      return res.status(500).json({ error: 'Server configuration error: Missing API Secret.' });
    }

    const paramsToSign = req.body && req.body.paramsToSign ? req.body.paramsToSign : {};
    
    // Tạo chữ ký dựa trên tham số mà Widget gửi lên
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      apiSecret
    );

    res.status(200).json({ signature });
  } catch (error: any) {
    console.error('[sign-upload] Failed to sign request:', error);
    res.status(500).json({ error: 'Failed to sign request', details: error.message });
  }
}
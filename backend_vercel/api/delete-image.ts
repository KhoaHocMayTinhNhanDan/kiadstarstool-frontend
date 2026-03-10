// api/delete-image.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import cloudinary from '../lib/cloudinary';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ error: 'Missing public_id' });
  }

  try {
    // Gọi Cloudinary để xóa ảnh
    const result = await cloudinary.uploader.destroy(public_id);
    
    // Coi cả 'ok' (đã xóa) và 'not found' (không tồn tại để xóa) là thành công
    if (result.result === 'ok' || result.result === 'not found') {
      return res.status(200).json({ success: true, message: `Image deletion status: ${result.result}` });
    }
    return res.status(500).json({ error: 'Failed to delete image', details: result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
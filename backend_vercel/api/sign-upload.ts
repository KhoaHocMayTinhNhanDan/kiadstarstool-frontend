import type { VercelRequest, VercelResponse } from "@vercel/node"
import admin from "../lib/firebase-admin-init"
import cloudinary from "../lib/cloudinary"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  try {
    // 1. Xác thực Firebase Token
    const authorization = req.headers.authorization
    if (!authorization?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" })
    
    const idToken = authorization.split("Bearer ")[1]
    const decoded = await admin.auth().verifyIdToken(idToken)
    const uid = decoded.uid

    // 2. Lấy params từ Widget gửi lên
    const params = req.body?.paramsToSign
    if (!params) return res.status(400).json({ error: "Missing params" })

    // 3. Bảo mật: Kiểm tra xem user có đang cố gắng upload vào folder/id của mình không
    // Điều này ngăn chặn việc User A ghi đè ảnh của User B
    const publicId = params.public_id || ""
    if (!publicId.includes(uid)) {
      return res.status(403).json({ error: "Access denied: UID mismatch" })
    }

    // 4. KÝ TẤT CẢ các params mà Widget gửi sang (bao gồm cả cropping params)
    // Cloudinary SDK sẽ tự động loại bỏ các key không cần thiết (file, api_key)
    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET!
    )

    return res.status(200).json({
      signature,
      timestamp: params.timestamp // Trả lại timestamp gốc của widget
    })
  } catch (error) {
    console.error("Signature Error:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
// api/delete-image.ts

import type { VercelRequest, VercelResponse } from '@vercel/node'
import cloudinary from '../lib/cloudinary'

export default async function handler(req: VercelRequest, res: VercelResponse) {

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {

    const { public_id } = req.body

    if (!public_id) {
      return res.status(400).json({ error: "Missing public_id" })
    }

    // tránh xóa nhầm
    if (!public_id.startsWith("avatars/")) {
      return res.status(403).json({ error: "Invalid public_id" })
    }

    const result = await cloudinary.uploader.destroy(public_id)

    if (result.result === "ok" || result.result === "not found") {
      return res.status(200).json({
        success: true,
        result: result.result
      })
    }

    return res.status(500).json({
      error: "Delete failed",
      details: result
    })

  } catch (error:any) {

    console.error("[delete-image]", error)

    return res.status(500).json({
      error: "Server error"
    })

  }

}
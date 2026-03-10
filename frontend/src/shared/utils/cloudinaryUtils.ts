// src/shared/utils/cloudinaryUtils.ts

/**
 * Trích xuất public_id từ một URL Cloudinary.
 *
 * Ví dụ:
 * https://res.cloudinary.com/demo/image/upload/v1234/avatars/user123.jpg
 * → avatars/user123
 *
 * Hỗ trợ cả URL có transformation:
 * https://res.cloudinary.com/demo/image/upload/c_fill,w_200,h_200/v1234/avatars/user123.jpg
 */
export function getPublicIdFromUrl(
  url: string | undefined | null
): string | null {

  if (!url) return null;

  try {

    // Decode URL để tránh lỗi ký tự encoded (%20, %2F...)
    const decodedUrl = decodeURIComponent(url);

    const parts = decodedUrl.split('/upload/');

    if (parts.length < 2) return null;

    let path = parts[1];

    let segments = path.split('/');

    // Tìm segment version v12345
    const versionIndex = segments.findIndex(segment => /^v\d+$/.test(segment));

    if (versionIndex !== -1) {
      // Nếu có version, public_id là tất cả các segment sau nó
      segments = segments.slice(versionIndex + 1);
    } else if (segments.length > 1 && segments[0].includes(',')) {
      // Heuristic: Nếu không có version, kiểm tra xem segment đầu tiên có phải là transformation không (thường chứa dấu phẩy)
      segments.shift(); // Bỏ segment transformation
    }

    const filePath = segments.join('/');

    // Bỏ extension (.jpg, .png...)
    return filePath.replace(/\.[^/.]+$/, '');

  } catch (error) {

    console.error('Failed to extract Cloudinary public_id:', error);

    return null;

  }

}


/**
 * Tạo URL avatar đã được tối ưu hóa từ public_id
 * (resize + auto format + auto quality)
 *
 * @param publicId Cloudinary public_id
 * @param size kích thước avatar (default 200px)
 */
export function getOptimizedAvatarUrl(
  publicId: string,
  size: number = 200
): string {

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  return `https://res.cloudinary.com/${cloudName}/image/upload/c_fill,w_${size},h_${size},q_auto,f_auto/${publicId}`;

}
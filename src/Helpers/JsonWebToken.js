const jwt = require('jsonwebtoken')

// Hàm tạo token JWT
export function generateJWTToken(payload, secretKey, expiresIn = '3h') {
    return jwt.sign(payload, secretKey, { expiresIn });
}

// Sử dụng hàm
const payload = { userId: 1, role: 'admin' };
const secretKey = 'your-secret-key'; // Bạn cần giữ secretKey này bí mật
const token = generateJWTToken(payload, secretKey);
console.log("JWT Token:", token);
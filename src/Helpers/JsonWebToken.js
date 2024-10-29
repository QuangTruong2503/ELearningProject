const jwt = require("jsonwebtoken");
const { jwtDecode } = require("jwt-decode");
// Hàm tạo token JWT
export function generateJWTToken(payload, secretKey, expiresIn = '3h') {
    return jwt.sign(payload, secretKey, { expiresIn });
}
// Hàm decode JWT
export const decodeJWT = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoixJDEg25nIG5o4bqtcCB0aMOgbmggY8O0bmciLCJpc0xvZ2luIjp0cnVlLCJ1c2VyTmFtZSI6ImFkbWluIiwiZW1haWwiOiJ0cnV0cnVvbmcyNTAzQGdtYWlsLmNvbSIsImNyZWF0ZUF0IjoiMjAyNC0xMC0wN1QwODowNjo0MC4zNTQyOTU0WiIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5U1VRaU9pSmhOVEU0WkRFMFlpMHpZVGhqTFRSbE1EY3RZakUyTkMweVpUQXdaV0kzT0RGa01USWlMQ0p5YjJ4bFNVUWlPaUpoWkcxcGJpSXNJbVY0Y0NJNk1UY3lPREk1TWpBd01IMC5ZN1pPaDdxZjFnMl9ndU9GdXYyT0ZNTEJJZ0U4b0VFRXJtcFhYVF8yNV9NIiwiaWF0IjoxNzI4Mjg5MTI3LCJleHAiOjE3MjgyOTk5Mjd9.8C_H2zgd2xSmForJDAYrW-QNCW2f0Vj0LVnNu0NRrXw';
// const decodedToken = decodeJWT(token);
// console.log(decodedToken);

// const payload = {
//     "message": "Đăng nhập thành công",
//     "isLogin": true,
//     "userName": "admin",
//     "email": "trutruong2503@gmail.com",
//     "createAt": "2024-10-07T08:06:40.3542954Z",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJhNTE4ZDE0Yi0zYThjLTRlMDctYjE2NC0yZTAwZWI3ODFkMTIiLCJyb2xlSUQiOiJhZG1pbiIsImV4cCI6MTcyODI5MjAwMH0.Y7ZOh7qf1g2_guOFuv2OFMLBIgE8oEEErmpXXT_25_M"
//   };
// const secretKey = 'your-secret-key'; // Bạn cần giữ secretKey này bí mật
// const token = generateJWTToken(payload, secretKey);
// console.log("JWT Token:", token);


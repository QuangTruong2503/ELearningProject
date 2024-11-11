//Hàm tải hình ảnh đã chọn lên cloudinary
export const fetchUploadCloudinary = async (selectedImagesData, category) => {
    const uploadedImagesData = [];
    console.log("Images is uploading...")
    for (let i = 0; i < selectedImagesData.length; i++) {
      const formData = new FormData();
      formData.append("file", selectedImagesData[i]);
      formData.append(
        "folder",
        `ELearning/${category}`
      );
      formData.append("upload_preset", "ml_default");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/brandocloud/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      const result = {
        thumbnail: data.secure_url,
        
      };
      uploadedImagesData.push(result);
    }
    console.log("Thêm ảnh vào Cloudinary thành công");
    return uploadedImagesData;
  };
  //Hàm tải một hình ảnh đã chọn lên cloudinary
export const fetchUploadCloudinaryOneImage = async (selectedImagesData, category) => {
  try {
    console.log("Uploading image...");

    // Tạo một FormData mới và gắn các thông tin cần thiết
    const formData = new FormData();
    formData.append("file", selectedImagesData);
    formData.append("folder", `ELearning/${category}`);
    formData.append("upload_preset", "ml_default");

    // Gửi request đến Cloudinary để upload ảnh
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/brandocloud/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    // Kiểm tra phản hồi từ server
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    // Lấy dữ liệu JSON từ phản hồi
    const data = await response.json();
    console.log("Image uploaded successfully:", data);

    // Trả về URL của ảnh đã upload
    return {
      thumbnail: data.secure_url,
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null; // hoặc bạn có thể xử lý theo cách khác nếu cần
  }
};
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
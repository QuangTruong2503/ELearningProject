import React, { useEffect, useState } from "react";
import "../../CssFolder/Images.css";
import { fetchUploadCloudinary } from "../../Helpers/UploadImageToCloudinary";

function ChooseImages({ maxFile = 10, maxSize = 3, images, upload = false, uploadSuccess, category = '' }) {
    const [error, setError] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);

    // Kiểm tra và thiết lập các file hợp lệ
    const validateAndSetFiles = (files) => {
        const validFiles = files.filter((file) => {
            const fileSizeMB = file.size / 1024 / 1024;
            if (fileSizeMB > maxSize) {
                setError(`Ảnh "${file.name}" vượt quá kích thước ${maxSize} MB`);
                return false;
            }
            return true;
        });

        if (validFiles.length > maxFile) {
            setError(`Tối đa ${maxFile} ảnh có thể được chọn`);
            return;
        }
        
        setSelectedImages(validFiles);
        setError("");
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        validateAndSetFiles(files);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        validateAndSetFiles(files);
    };

    useEffect(() => {
        if (upload && selectedImages.length > 0) {
            const handleUploadCloudinary = async () => {
                const result = await fetchUploadCloudinary(selectedImages, category);
                if (result) {
                    uploadSuccess();
                    images(result);
                }
            };
            handleUploadCloudinary();
        }
    }, [upload, selectedImages, category, images, uploadSuccess]);

    return (
        <div>
            <div
                className="file-upload-container"
                id="fileUploadContainer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <div className="file-upload-text">
                    <div className="text-center mt-1">
                        {selectedImages.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`Selected ${index + 1}`}
                                className="img-thumbnail m-2"
                                style={{ maxWidth: "200px", height: "auto" }}
                            />
                        ))}
                    </div>
                    <p>
                        Kéo thả ảnh vào đây hoặc <strong>chọn từ máy tính</strong>
                    </p>
                    <small className="text-muted">
                        (Kích thước: tối đa {maxSize} MB | Tối đa: {maxFile} ảnh)
                    </small>
                </div>
                <input
                    type="file"
                    id="imageUpload"
                    name="image"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{
                        opacity: 0,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                />
            </div>

            {error && <p className="text-danger mt-2">{error}</p>}
        </div>
    );
}

export default ChooseImages;

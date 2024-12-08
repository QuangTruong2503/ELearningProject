
  // Hàm tải file từ Google Drive
  export async function downloadFromGoogleDrive(fileId, fileName) {
    const downloadUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;

    // Hàm thực hiện tải file
    const downloadFile = () =>
      new Promise((resolve, reject) => {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName || "downloaded_file";

        // Xử lý tải xuống
        link.onload = () => resolve();
        link.onerror = () => reject(new Error("Failed to download file"));

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      downloadFile();
  }
export function convertToVietnamTime(date) {
    // Lấy thời gian hiện tại nếu không có đầu vào
    const currentDate = date ? new Date(date) : new Date();
    // Chuyển đổi sang giờ Việt Nam (GMT+7)
    const vietnamOffset = 7; // Giờ lệch của Việt Nam
    const utc = currentDate.getTime() + currentDate.getTimezoneOffset() * 60000; // UTC time
    const vietnamTime = new Date(utc + vietnamOffset * 3600000); // GMT+7
    return vietnamTime;
}
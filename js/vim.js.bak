let keyBuffer = ""; // Biến để lưu trữ chuỗi phím (dùng cho 'gg')
let bufferTimeout;

console.log("Vim script loaded");

document.addEventListener("keydown", function(event) {
  // 1. Bỏ qua nếu người dùng đang nhập liệu (input, textarea, v.v.)
  console.log("Event keydown", {event});
  const target = event.target;
  if (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  ) {
    return;
  }

  console.log("Vim behavior!");

  // 2. Xử lý các phím đơn
  const key = event.key;

  // Cuộn xuống (j)
  if (key === "j") {
    window.scrollBy({ top: 50, behavior: "smooth" });
  }

  // Cuộn lên (k)
  if (key === "k") {
    window.scrollBy({ top: -50, behavior: "smooth" });
  }

  // Về cuối trang (G - Shift+g)
  if (key === "G") {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  // Đóng tab (x)
  if (key === "x") {
    // Gửi yêu cầu đóng tab tới background script
    chrome.runtime.sendMessage({ action: "close_tab" });
  }

  // 3. Xử lý phím phức hợp (gg)
  // Thêm phím vào buffer
  keyBuffer += key;

  // Kiểm tra 'gg'
  if (keyBuffer === "gg") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    keyBuffer = ""; // Reset buffer
  }

  // Xóa buffer sau 500ms nếu không gõ tiếp
  clearTimeout(bufferTimeout);
  bufferTimeout = setTimeout(() => {
    keyBuffer = "";
  }, 500);
});

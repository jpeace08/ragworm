let isEnabled = true; // Trạng thái mặc định là BẬT
let mouseX = 0;
let mouseY = 0;

// Theo dõi vị trí chuột
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Hàm tìm phần tử cuộn chuẩn xác
function isScrollable(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    const overflowY = style.getPropertyValue('overflow-y');
    const hasScrollStyle = ['auto', 'scroll'].includes(overflowY);
    const canScroll = el.scrollHeight > el.clientHeight;
    return canScroll && hasScrollStyle;
}

function getBestScrollElement() {
    let el = document.elementFromPoint(mouseX, mouseY);
    while (el) {
        if (isScrollable(el)) return el;
        el = el.parentElement;
    }
    return document.scrollingElement || document.documentElement;
}

// Tạo Indicator và cập nhật màu sắc theo trạng thái
function updateIndicator() {
    let indicator = document.querySelector('.vim-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'vim-indicator';
        document.body.appendChild(indicator);
    }
    
    if (isEnabled) {
        indicator.innerText = '-- VIM MODE --';
        indicator.style.borderColor = '#00ff00';
        indicator.style.color = '#00ff00';
    } else {
        indicator.innerText = '-- DISABLED --';
        indicator.style.borderColor = '#ff4444';
        indicator.style.color = '#ff4444';
    }
}

// --- XỬ LÝ PHÍM TẮT ---
let keyBuffer = "";
let bufferTimeout;

document.addEventListener("keydown", function(event) {
    // 1. Phím nóng để Bật/Tắt: Alt + v
    if (event.altKey && event.key.toLowerCase() === 'v') {
        isEnabled = !isEnabled;
        updateIndicator();
        return;
    }

    // 2. Nếu đang tắt hoặc đang nhập liệu thì không làm gì cả
    if (!isEnabled) return;
    
    const target = event.target;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
    }

    const key = event.key;
    const scrollEl = getBestScrollElement();
    const step = 80;

    switch (key) {
        case "j":
            scrollEl.scrollBy({ top: step, behavior: "smooth" });
            break;
        case "k":
            scrollEl.scrollBy({ top: -step, behavior: "smooth" });
            break;
        case "G":
            scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "smooth" });
            break;
        case "x":
            chrome.runtime.sendMessage({ action: "close_tab" });
            break;
    }

    // Xử lý 'gg'
    keyBuffer += key;
    if (keyBuffer === "gg") {
        scrollEl.scrollTo({ top: 0, behavior: "smooth" });
        keyBuffer = "";
    }
    clearTimeout(bufferTimeout);
    bufferTimeout = setTimeout(() => { keyBuffer = ""; }, 500);

}, true);

// Khởi tạo indicator khi load trang
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateIndicator);
} else {
    // updateIndicator();
}

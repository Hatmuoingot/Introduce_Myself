// Logic menu di động
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileNav.classList.toggle('is-visible');
});

// Logic phát nhạc Đĩa than
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const player = document.getElementById('vinyl-player');
    
    if (audio.paused) {
        audio.play();
        player.classList.add('playing');
    } else {
        audio.pause();
        player.classList.remove('playing');
    }
}

// Data cho các Album
const socialData = {
    'facebook': {
        title: 'Facebook',
        desc: 'Bộ ảnh mới nhất của mình chụp',
        img: './images/fb_preview.jpg',
        link: 'https://www.facebook.com/duyennguyen157/posts/pfbid0y2exanViRzGWhNn5spGT9BqJpRNeSzwBq2Azqa9AXrm3BrUTQMxsioWTMUwXvS9Jl'
    },
    'tiktok': {
        title: 'TikTok',
        desc: 'Cũng không ngờ là mình có một vài bức ảnh được nhiều view trên TikTok, đây là một trong số đó.',
        img: './images/tiktok2.JPG',
        link: 'https://www.tiktok.com/@tnll2911204/photo/7554756436568362258?lang=vi-VN'
    },
    'freestyle': {
        title: 'Khoảnh khắc tự do',
        desc: 'Một bộ sưu tập tự do và đây là mình người đã chụp những tấm hình đó.',
        img: './images/IMG_9474.jpeg',
        link: 'https://photos.app.goo.gl/kbc1wmP45gpYWSXJA' // Đây là nơi bạn để link Drive nếu muốn khách xem full kho ảnh
    }
};

function openPreview(platform) {
    const data = socialData[platform];
    const imgElement = document.getElementById('target-preview-img');
    const spinner = document.getElementById('preview-spinner');
    
    // 1. Cập nhật các thông tin văn bản ngay lập tức
    document.getElementById('target-title').innerText = data.title;
    document.getElementById('target-desc').innerText = data.desc;
    document.getElementById('target-link').href = data.link;
    
    // 2. Reset ảnh cũ và hiện spinner
    imgElement.style.opacity = '0';
    imgElement.removeAttribute('src');
    if (spinner) spinner.style.display = 'block';
    
    // 3. Mở cửa sổ Overlay lên trước
    const overlay = document.getElementById('preview-overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 4. Lắng nghe sự kiện tải xong
    imgElement.onload = function() {
        if (spinner) spinner.style.display = 'none';
        imgElement.style.opacity = '1';
    };

    // 5. Gán src để bắt đầu tải
    imgElement.src = data.img;
    
    // 6. Xử lý trường hợp ảnh đã có sẵn trong cache
    if (imgElement.complete) {
        imgElement.onload();
    }
}

// Preload ảnh để mở preview nhanh hơn
window.addEventListener('load', () => {
    setTimeout(() => {
        Object.values(socialData).forEach(data => {
            if (data.img) {
                const img = new Image();
                img.src = data.img;
            }
        });
    }, 1000); // Đợi trang load xong 1s rồi mới tải ngầm ảnh preview
});

function closePreview() {
    const overlay = document.getElementById('preview-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();
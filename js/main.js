// 数字增长动画
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// 滚动动画
function animateOnScroll() {
    const elements = document.querySelectorAll('.team-card, .section');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
        }
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 新的公告系统功能
function initNotification() {
    const notificationBar = document.querySelector('.global-notification');
    const closeBtn = document.querySelector('.notification-close');
    
    // 如果没有公告内容，隐藏通知栏
    if (!notificationBar) return;
    
    // 关闭通知
    closeBtn.addEventListener('click', function() {
        notificationBar.style.display = 'none';
        localStorage.setItem('notificationClosed', 'true');
    });
    
    // 检查是否已经关闭过通知
    if (localStorage.getItem('notificationClosed') === 'true') {
        notificationBar.style.display = 'none';
    }
}

// 初始化友情链接
function initLinks() {
    // 这里可以添加从服务器获取友情链接的逻辑
    // 示例：
    /*
    fetch('/api/links')
        .then(response => response.json())
        .then(links => {
            const linksGrid = document.querySelector('.links-grid');
            linksGrid.innerHTML = '';
            
            links.forEach(link => {
                const linkItem = document.createElement('a');
                linkItem.className = 'link-item';
                linkItem.href = link.url;
                linkItem.target = '_blank';
                linkItem.innerHTML = `
                    <div class="link-logo">
                        <img src="${link.logo}" alt="${link.name}">
                    </div>
                    <div class="link-info">
                        <h3>${link.name}</h3>
                        <p>${link.description}</p>
                    </div>
                `;
                linksGrid.appendChild(linkItem);
            });
        });
    */
}

// 服务器图片点击放大
document.querySelectorAll('.server-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        overlay.style.cursor = 'zoom-out';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.objectFit = 'contain';
        
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
    });
});

// 页面加载后执行
document.addEventListener('DOMContentLoaded', function() {
    // 数字动画
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(statsSection);
        }
    });
    
    observer.observe(statsSection);
    
    // 滚动动画
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初始检查
    
    // 团队成员卡片动画
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // 初始化功能
    initNotification();
    initLinks();
});
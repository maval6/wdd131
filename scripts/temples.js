// Footer dynamic content
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent += document.lastModified;

// Hamburger menu
const hamburgerBtn = document.querySelector('.hamburger-btn');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburgerBtn.textContent = hamburgerBtn.textContent === '☰' ? '✕' : '☰';
});

// Update menu title based on selection
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        document.getElementById('menu-title').textContent = e.target.textContent;
    });
});
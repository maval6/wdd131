
document.addEventListener('DOMContentLoaded', () => {
    const reviewCount = localStorage.getItem('reviewCount') || '0';
    document.getElementById('reviewCount').textContent = reviewCount;
});

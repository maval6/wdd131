const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// Populate product select options
document.addEventListener('DOMContentLoaded', () => {
    const productSelect = document.getElementById('product');
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
        productSelect.appendChild(option);
    });
});

// Handle form submission
document.querySelector('form').addEventListener('submit', (e) => {
    // Get current review count from localStorage
    let reviewCount = parseInt(localStorage.getItem('reviewCount') || '0');
    
    // Increment count
    reviewCount++;
    
    // Save back to localStorage
    localStorage.setItem('reviewCount', reviewCount.toString());
});
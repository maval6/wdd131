// Event data
const events = [
    {
        title: "Web Development Workshop",
        date: "March 1, 2025",
        time: "6:00 PM",
        description: "Learn modern web development practices and tools from industry experts.",
        image: "./images/webdevworkshop.webp"
    },
    {
        title: "Coding Challenge",
        date: "March 5, 2025",
        time: "7:00 PM",
        description: "Test your skills with real-world programming challenges and win prizes.",
        image: "./images/coding-challenge.webp"
    },
    {
        title: "Hackathon Prep",
        date: "March 10, 2025",
        time: "6:30 PM",
        description: "Get ready for upcoming hackathons with our preparation sessions.",
        image: "./images/hackathon-prep.webp"
    }
];

// Populate events
function displayEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;
    
    eventsContainer.innerHTML = ''; // Clear existing events
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="event-card-content">
                <h3>${event.title}</h3>
                <p><strong>${event.date} at ${event.time}</strong></p>
                <p>${event.description}</p>
                <button class="button" onclick="registerForEvent('${event.title}')">Register Now</button>
            </div>
        `;
        
        eventsContainer.appendChild(eventCard);
    });
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    const handleSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        // Store search term in localStorage
        localStorage.setItem('lastSearch', searchTerm);
        
        // Filter events based on search term
        const filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );

        // Update events display
        const eventsContainer = document.getElementById('eventsContainer');
        eventsContainer.innerHTML = '';

        if (filteredEvents.length === 0) {
            eventsContainer.innerHTML = `
                <div class="no-results">
                    <p>No events found matching "${searchTerm}"</p>
                </div>
            `;
        } else {
            filteredEvents.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                eventCard.innerHTML = `
                    <img src="${event.image}" alt="${event.title}">
                    <div class="event-card-content">
                        <h3>${event.title}</h3>
                        <p><strong>${event.date} at ${event.time}</strong></p>
                        <p>${event.description}</p>
                        <button class="button" onclick="registerForEvent('${event.title}')">Register Now</button>
                    </div>
                `;
                eventsContainer.appendChild(eventCard);
            });
        }
    };

    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Restore last search
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        searchInput.value = lastSearch;
    }
}

// Event registration system
function registerForEvent(eventTitle) {
    const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
    
    // Check if already registered
    if (registrations.some(reg => reg.event === eventTitle)) {
        alert('You are already registered for this event!');
        return;
    }
    
    registrations.push({
        event: eventTitle,
        date: new Date().toISOString(),
        userId: getUserId() // Get or create user ID
    });
    
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    alert(`Successfully registered for ${eventTitle}!`);
}

// User ID management
function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

// Smooth scrolling for navigation
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Form validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Initialize everything when the DOM loads
document.addEventListener('DOMContentLoaded', () => {
    displayEvents();
    initializeSearch();
    initializeSmoothScroll();
    initializeScrollAnimations();

    // Handle form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                // Handle form submission
                console.log('Form submitted:', new FormData(form));
                form.reset();
            }
        });
    });

    // Add responsive menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // You could implement error reporting here
});
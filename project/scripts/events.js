// Event categories and their data
const eventCategories = {
    all: 'all',
    workshops: 'workshops',
    webinars: 'webinars',
    hackathons: 'hackathons',
    meetups: 'meetups',
    conferences: 'conferences'
};

// Sample event data (you would typically fetch this from a server)
const events = [
    {
        title: 'Web Development Workshop',
        date: '2025-03-01',
        category: 'workshops',
        image: './images/webdevworkshop.webp',
        description: 'Learn the basics of web development',
    },
    {
        title: "Coding Challenge",
        date: "March 5, 2025",
        category: 'webinars',
        description: "Test your skills with real-world programming challenges and win prizes.",
        image: "./images/coding-challenge.webp"
    },
    {
        title: "Hackathon Prep",
        date: "March 10, 2025",
        category: 'hackathons',
        description: "Get ready for upcoming hackathons with our preparation sessions.",
        image: "./images/hackathon-prep.webp"
    },
    {
        title: 'Local Developer Meetup',
        date: '2025-03-20',
        category: 'meetups',
        image: './images/localdevmeetup.webp',
        description: 'Network with local developers',
    },
    {
        title: 'Program Developer Conference 2025',
        date: '2025-04-01',
        category: 'conferences',
        image: './images/programdevconf.webp',
        description: 'Annual developer conference',
    }
];

// DOM Elements
const categoryButtons = document.querySelectorAll('.category-btn');
const eventsContainer = document.querySelector('.events-container');

// Function to create event card HTML
function createEventCard(event) {
    return `
        <div class="event-card">
            <img src="${event.image}" alt="${event.title}">
            <div class="event-card-content">
                <h3>${event.title}</h3>
                <p class="event-date">${formatDate(event.date)}</p>
                <p>${event.description}</p>
                <button class="button">Learn More</button>
            </div>
        </div>
    `;
}

// Format date function
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Filter events by category
function filterEvents(category) {
    const filteredEvents = category === 'all' 
        ? events 
        : events.filter(event => event.category === category);
    
    eventsContainer.innerHTML = filteredEvents
        .map(event => createEventCard(event))
        .join('');
}

// Add click event listeners to category buttons
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter events based on category
        const category = button.getAttribute('data-category');
        filterEvents(category);
    });
});

// Initialize with all events
document.addEventListener('DOMContentLoaded', () => {
    filterEvents('all');
    
    // Set 'All' button as active by default
    const allButton = document.querySelector('[data-category="all"]');
    if (allButton) {
        allButton.classList.add('active');
    }
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
        
        eventsContainer.innerHTML = filteredEvents
            .map(event => createEventCard(event))
            .join('');
    });
}
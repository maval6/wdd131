// Documentation data
const documentationItems = [
    {
        title: "Getting Started Guide",
        category: "Fundamentals",
        description: "Complete guide for new developers to set up their development environment and start coding.",
        icon: "📚",
        difficulty: "Beginner",
        estimatedTime: "2 hours",
        link: "#"
    },
    {
        title: "Web Development Best Practices",
        category: "Web Development",
        description: "Learn industry-standard practices for building modern, responsive web applications.",
        icon: "🌐",
        difficulty: "Intermediate",
        estimatedTime: "4 hours",
        link: "#"
    },
    {
        title: "API Development Guide",
        category: "Backend",
        description: "Comprehensive guide to building RESTful APIs and handling data.",
        icon: "🔌",
        difficulty: "Advanced",
        estimatedTime: "6 hours",
        link: "#"
    },
    {
        title: "Mobile App Architecture",
        category: "Mobile Development",
        description: "Learn about mobile app architecture patterns and best practices.",
        icon: "📱",
        difficulty: "Intermediate",
        estimatedTime: "5 hours",
        link: "#"
    },
    {
        title: "Data Science Workflow",
        category: "Data Science",
        description: "Step-by-step guide to setting up a data science workflow and tools.",
        icon: "📊",
        difficulty: "Advanced",
        estimatedTime: "8 hours",
        link: "#"
    },
    {
        title: "Testing Fundamentals",
        category: "Quality Assurance",
        description: "Learn about different testing methodologies and tools for quality assurance.",
        icon: "🧪",
        difficulty: "Intermediate",
        estimatedTime: "3 hours",
        link: "#"
    }
];

// Function to create a documentation card
function createDocCard(doc) {
    const card = document.createElement('div');
    card.className = 'doc-card';
    card.style.background = 'white';
    card.style.padding = '2rem';
    card.style.borderRadius = '8px';
    card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.gap = '1rem';

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.gap = '1rem';

    const icon = document.createElement('span');
    icon.textContent = doc.icon;
    icon.style.fontSize = '2rem';

    const titleContainer = document.createElement('div');
    
    const title = document.createElement('h3');
    title.textContent = doc.title;
    title.style.margin = '0';
    title.style.color = 'var(--text-color)';

    const category = document.createElement('span');
    category.textContent = doc.category;
    category.style.fontSize = '0.875rem';
    category.style.color = 'var(--primary-color)';

    titleContainer.appendChild(title);
    titleContainer.appendChild(category);
    header.appendChild(icon);
    header.appendChild(titleContainer);

    const description = document.createElement('p');
    description.textContent = doc.description;
    description.style.margin = '0';
    description.style.color = 'var(--text-color-light)';

    const metadata = document.createElement('div');
    metadata.style.display = 'flex';
    metadata.style.justifyContent = 'space-between';
    metadata.style.borderTop = '1px solid #eee';
    metadata.style.paddingTop = '1rem';
    metadata.style.marginTop = 'auto';

    const difficulty = document.createElement('span');
    difficulty.textContent = `Difficulty: ${doc.difficulty}`;
    difficulty.style.fontSize = '0.875rem';

    const time = document.createElement('span');
    time.textContent = doc.estimatedTime;
    time.style.fontSize = '0.875rem';

    metadata.appendChild(difficulty);
    metadata.appendChild(time);

    const link = document.createElement('a');
    link.href = doc.link;
    link.className = 'button';
    link.textContent = 'Read Guide';
    link.style.textAlign = 'center';
    link.style.marginTop = '1rem';

    card.appendChild(header);
    card.appendChild(description);
    card.appendChild(metadata);
    card.appendChild(link);

    return card;
}

// Function to initialize the documentation section
function initializeDocumentation() {
    const docsGrid = document.querySelector('.docs-grid');
    if (!docsGrid) return;

    documentationItems.forEach(doc => {
        const card = createDocCard(doc);
        docsGrid.appendChild(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDocumentation);
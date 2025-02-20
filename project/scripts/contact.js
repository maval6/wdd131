// DOM Elements
const contactForm = document.getElementById('contactForm');
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.textContent = 'Thank you for your message! We will get back to you soon.';

// Form Validation Configuration
const validationConfig = {
    name: {
        pattern: /^[a-zA-Z\s]{2,50}$/,
        message: 'Please enter a valid name (2-50 characters, letters only)'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    subject: {
        pattern: /.{5,100}/,
        message: 'Subject must be between 5 and 100 characters'
    },
    message: {
        pattern: /.{10,1000}/,
        message: 'Message must be between 10 and 1000 characters'
    }
};

// Create and append error message element
function showError(input, message) {
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and append new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

// Remove error message
function removeError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Validate single input field
function validateField(input) {
    const config = validationConfig[input.name];
    if (!config) return true;

    const isValid = config.pattern.test(input.value);
    if (!isValid) {
        showError(input, config.message);
    } else {
        removeError(input);
    }
    return isValid;
}

// Real-time validation
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('input', () => {
        if (input.parentElement.querySelector('.error-message')) {
            validateField(input);
        }
    });
});

// Form submission handler
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    // Disable form submission button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        // Simulate form submission with a delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Clear form
        contactForm.reset();

        // Show success message
        if (!contactForm.querySelector('.success-message')) {
            contactForm.insertBefore(successMessage, contactForm.firstChild);
        }

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);

    } catch (error) {
        console.error('Error submitting form:', error);
        showError(submitButton, 'An error occurred. Please try again later.');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// Enhance user experience with smooth scrolling to form
document.querySelectorAll('a[href="#contactForm"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        contactForm.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add form field character counters
const messageInput = document.getElementById('message');
if (messageInput) {
    const counterDiv = document.createElement('div');
    counterDiv.className = 'character-counter';
    messageInput.parentElement.appendChild(counterDiv);

    messageInput.addEventListener('input', () => {
        const remaining = 1000 - messageInput.value.length;
        counterDiv.textContent = `${remaining} characters remaining`;
        counterDiv.style.color = remaining < 50 ? '#ff6b6b' : '#666';
    });
}

// Add form autosave functionality
const formData = new Map();

// Save form data to localStorage
function saveFormData() {
    const data = {};
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        data[input.id] = input.value;
    });
    localStorage.setItem('contactFormData', JSON.stringify(data));
}

// Load saved form data
function loadFormData() {
    const saved = localStorage.getItem('contactFormData');
    if (saved) {
        const data = JSON.parse(saved);
        Object.entries(data).forEach(([id, value]) => {
            const input = document.getElementById(id);
            if (input) {
                input.value = value;
            }
        });
    }
}

// Save form data when input changes
contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', saveFormData);
});

// Load saved data when page loads
document.addEventListener('DOMContentLoaded', loadFormData);

// Clear saved data when form is submitted successfully
contactForm.addEventListener('submit', () => {
    localStorage.removeItem('contactFormData');
});
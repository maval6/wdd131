const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('.list');

// Load chapters from localStorage or initialize empty array
let chapters = JSON.parse(localStorage.getItem('bomChapters')) || [];

// Display existing chapters on page load
function displayChapters() {
    list.innerHTML = ''; // Clear current list
    chapters.forEach(chapter => {
        const li = document.createElement('li');
        li.dataset.id = chapter.id;
        
        const span = document.createElement('span');
        span.textContent = chapter.value;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.addEventListener('click', () => {
            chapters = chapters.filter(item => item.id !== chapter.id);
            localStorage.setItem('bomChapters', JSON.stringify(chapters));
            li.remove();
        });
        
        li.append(span, deleteBtn);
        list.append(li);
    });
}

// Initial display of chapters
displayChapters();

button.addEventListener('click', () => {
    const chapterText = input.value.trim();
    
    if (chapterText === '') {
        input.focus();
        return;
    }

    // Create new chapter object
    const newChapter = {
        id: Date.now(), // Unique identifier
        value: chapterText
    };

    // Add to array and save to localStorage
    chapters.push(newChapter);
    localStorage.setItem('bomChapters', JSON.stringify(chapters));

    // Create and append new list item
    const li = document.createElement('li');
    li.dataset.id = newChapter.id;
    
    const span = document.createElement('span');
    span.textContent = chapterText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', () => {
        chapters = chapters.filter(item => item.id !== newChapter.id);
        localStorage.setItem('bomChapters', JSON.stringify(chapters));
        li.remove();
    });
    
    li.append(span, deleteBtn);
    list.append(li);

    // Clear input and refocus
    input.value = '';
    input.focus();
});
document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('#favchap');
    const button = document.querySelector('button'); // Target add button
    const list = document.querySelector('#list');

    // Load stored chapters
    let chapters = JSON.parse(localStorage.getItem('bomChapters')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('bomChapters', JSON.stringify(chapters));
    }

    function createListItem(chapter) {
        const li = document.createElement('li');
        li.dataset.id = chapter.id;

        const span = document.createElement('span');
        span.textContent = chapter.value;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.classList.add('delete');
        deleteBtn.setAttribute('aria-label', `Delete ${chapter.value}`);

        li.append(span, deleteBtn);
        return li;
    }

    function displayChapters() {
        list.innerHTML = ''; // Clear list before re-rendering
        chapters.forEach(chapter => list.appendChild(createListItem(chapter)));
    }

    button.addEventListener('click', () => {
        const chapterText = input.value.trim();
        if (!chapterText) {
            input.focus();
            return;
        }

        const newChapter = { id: Date.now(), value: chapterText };
        chapters.push(newChapter);
        saveToLocalStorage();

        list.appendChild(createListItem(newChapter));

        input.value = '';
        input.focus();
    });

    list.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const li = event.target.closest('li');
            chapters = chapters.filter(chapter => chapter.id !== parseInt(li.dataset.id, 10));
            saveToLocalStorage();
            li.remove();
        }
    });

    displayChapters(); // Display stored chapters on page load
});

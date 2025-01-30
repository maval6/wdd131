const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('.list');

button.addEventListener('click', () => {
    // Check if input is not blank
    if (input.value.trim() !== '') {
        // Create list item and delete button
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');

        // Populate list item text
        li.textContent = input.value;

        // Configure delete button
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', () => {
            li.remove(); // Remove the parent li element
            input.focus(); // Return focus to input
        });

        // Append elements
        li.append(deleteButton);
        list.append(li);

        // Clear input field
        input.value = '';
    }
    
    // Always return focus to input field
    input.focus();
});
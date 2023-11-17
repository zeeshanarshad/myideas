// Function to add a new idea
function addIdea() {
    const ideaInput = document.getElementById('ideaInput');
    const ideaText = ideaInput.value.trim();

    if (ideaText !== '') {
        // Retrieve existing ideas from localStorage
        const existingIdeas = JSON.parse(localStorage.getItem('ideas')) || [];

        // Add the new idea to the list
        const newIdea = { text: ideaText };
        existingIdeas.push(newIdea);

        // Save the updated list to localStorage
        localStorage.setItem('ideas', JSON.stringify(existingIdeas));

        // Update the UI
        updateUI();

        // Clear the input
        ideaInput.value = '';
    }
}

// Function to edit an existing idea
function editIdea(button) {
    const newIdeaText = prompt('Edit your idea:', button.previousElementSibling.textContent);
    if (newIdeaText !== null) {
        // Retrieve existing ideas from localStorage
        const existingIdeas = JSON.parse(localStorage.getItem('ideas')) || [];

        // Find the edited idea in the list and update its text
        const editedIndex = Array.from(button.parentElement.parentNode.children).indexOf(button.parentElement);
        existingIdeas[editedIndex].text = newIdeaText;

        // Save the updated list to localStorage
        localStorage.setItem('ideas', JSON.stringify(existingIdeas));

        // Update the UI
        updateUI();
    }
}

// Function to remove an idea
function removeIdea(button) {
    const listItem = button.parentElement;
    // Retrieve existing ideas from localStorage
    const existingIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
    
    // Remove the idea from the list
    const removedIndex = Array.from(listItem.parentNode.children).indexOf(listItem);
    existingIdeas.splice(removedIndex, 1);

    // Save the updated list to localStorage
    localStorage.setItem('ideas', JSON.stringify(existingIdeas));

    // Update the UI
    updateUI();
}

// Function to update the UI with ideas from localStorage
function updateUI() {
    const ideasList = document.getElementById('ideasList');
    // Clear the current list
    ideasList.innerHTML = '';

    // Retrieve existing ideas from localStorage
    const existingIdeas = JSON.parse(localStorage.getItem('ideas')) || [];

    // Populate the list with ideas
    existingIdeas.forEach((idea, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${idea.text}</span>
            <button onclick="editIdea(this)">Edit</button>
            <button onclick="removeIdea(this)">Remove</button>
        `;
        ideasList.appendChild(li);
    });
}

// Initial update when the page loads
updateUI();

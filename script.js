const fetchButton = document.getElementById('fetchButton');
const lineCountSelect = document.getElementById('lineCountSelect');
const poemsContainer = document.getElementById('poems');

fetchButton.addEventListener('click', () => {
    const selectedLineCount = lineCountSelect.value;

    // Fetch poems based on the selected line count
    fetch(`https://poetrydb.org/linecount/${selectedLineCount}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            poemsContainer.innerHTML = '';

            // Display poems
            data.forEach(poem => {
                const poemElement = document.createElement('div');
                poemElement.classList.add('poem');
                poemElement.innerHTML = `<h3>${poem.title}</h3>
                                          <p>Author: ${poem.author}</p>
                                          <ul>${poem.lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
                poemsContainer.appendChild(poemElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

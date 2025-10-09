// Fetch data and display it
// fetch() is an built-in JavaScript function used to request data from a resource(file/API)
// It returns a Promise, meaning the code run asynchronously
// Once the file is fetched, the promise resolves to a Response Object
fetch('data.json')
    // Handles what happens after the fetch request succeeds
    // Checks if the request was successful(HTTP STATUS 200-299) if not it throws an error
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        // converts response body from raw text into actual JSON data
        return response.json();
    })
    // This runs after the JSON has been parsed successfully
    // The variable data now holds the actual JSON Object
    .then(data => {
        const container = document.getElementById('results-container');
        // Clears any existing content in the container
        container.innerHTML = ''; 

        const heading = document.createElement('h3');
        heading.innerText = 'Summary';
        heading.classList.add('results-summary');

        container.appendChild(heading);

        
        // loops through each item inside the results array from the JSON file
        data.results.forEach(result => {
            // create a new div for each result
            const div = document.createElement('div')

            // add a category-based class when styling each result
            div.classList.add('result-card')
            div.classList.add(result.category.toLowerCase());


            div.innerHTML = `
                <img src='${result.icon}' alt='${result.category} icon' class='icon'>

                <div class='info'>
                    <h5>${result.category}</h5>
                    <p>${result.score} / 100</p>
                </div>
            `;

            // Append the result to the container
            container.appendChild(div);
        });

        const button = document.createElement('button');
        button.innerText = 'Continue';
        button.classList.add('continue-btn');

        container.appendChild(button)
    })
    .catch(error => {
        console.error('Error Loading JSON:', error);
        document.getElementById('results-container').innerText = 'Failed to load the results';
    })
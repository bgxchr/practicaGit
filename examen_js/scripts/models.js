// Fetch the JSON data
fetch('../scripts/models.json')
    .then(response => response.json())
    .then(cars => {
        const carContainer = document.querySelector('.container');
        const filterButtons = document.querySelectorAll('.button');

        // Store all cars globally
        let allCars = cars;
        let currentFilter = 'all';

        // Function to display cars
        function displayCars(carsToDisplay) {
            carContainer.innerHTML = ''; // Clear container
            
            if (carsToDisplay.length === 0) {
                carContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No cars found in this category.</p>';
                return;
            }
            
            carsToDisplay.forEach((car) => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${car.img}" alt="${car.model}" onerror="this.src='https://via.placeholder.com/400x250?text=Image+Not+Found'">
                    <div class="car-info">
                        <h3 class="car-title">${car.model}</h3>
                        <h4 class="car-model">${car.bodystyle}</h4>
                        <p class="car-price">Starting at ${car.price}</p>
                        <button class="add-to__cart">Explore</button>
                    </div>
                `;
                carContainer.appendChild(productCard);
            });
        }

        // Function to filter cars
        function filterCars(filterValue) {
            if (filterValue === 'all') {
                displayCars(allCars);
            } else {
                // Match the bodystyle from JSON with button filter
                const filteredCars = allCars.filter((car) => {
                    // Handle different naming conventions
                    if (filterValue === 'SUVs' && car.bodystyle === 'SUV') return true;
                    if (filterValue === 'Coupes & Convertibles' && car.bodystyle === 'Coupes & Convertibles') return true;
                    return car.bodystyle === filterValue;
                });
                displayCars(filteredCars);
            }
        }

        // Add event listeners to filter buttons
        filterButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                e.currentTarget.classList.add('active');
                
                // Get filter value from data-filter attribute
                const filterValue = e.currentTarget.getAttribute('data-filter');
                currentFilter = filterValue;
                
                // Filter and display cars
                filterCars(filterValue);
            });
        });

        // Display all cars on page load
        displayCars(allCars);
    })
    .catch(error => {
        console.error('Error loading cars:', error);
        document.querySelector('.container').innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: red;">Error loading cars. Please check the console for details.</p>';
    });
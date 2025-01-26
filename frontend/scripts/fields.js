document.addEventListener("DOMContentLoaded", async function () {
    const filterDropdown = document.getElementById("sport-filter");
    const itemsList = document.getElementById("fieldsListContainer");

    // Fetch sports to populate the filter dropdown
    const fetchSports = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/user/sports");
            if (!response.ok) {
                throw new Error("Failed to fetch sports.");
            }

            const sports = await response.json();
            
            // Populate the dropdown
            const allOption = document.createElement("option");
            allOption.value = 0;
            allOption.textContent = "All Sports";
            filterDropdown.appendChild(allOption);

            sports.forEach(sport => {
                console.log(sport);
                const option = document.createElement("option");
                option.value = sport.id;
                option.textContent = sport.name;
                filterDropdown.appendChild(option);
            });
        } catch (error) {
            console.error("Error fetching sports:", error);
            filterDropdown.innerHTML = `<option value="">Error loading sports</option>`;
        }
    };

    // Fetch and render items (fields)
    const fetchItems = async (filter = 0) => {
        try {
            const url = `http://localhost:8080/api/user/fields?filter=${filter}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch items.");
            }

            itemsList.innerHTML = ``; // Clear the existing items
            const items = await response.json();

            if (items.length === 0) {
                itemsList.innerHTML = `<p>No fields available for the selected sport.</p>`;
                return;
            }

            // Dynamically create item containers
            items.forEach(item => {
                console.log(item);
                const itemCard = document.createElement("div");
                itemCard.classList.add("item-card");

                itemCard.innerHTML = `
                    <img src="/frontend/images/${item.sportName}.jpg" alt="${item.sportName}" />
                    <div class="details-container">
                        <div id="item-name"><h2>${item.name}</h2></div>
                        <div id="details">
                            <h3>${item.sportName}</h3>
                            <h3>${item.length}mx${item.width}m</h3>
                        </div>
                        <button class="book-button">Book</button>
                    </div>
                `;

                itemCard.querySelector(".book-button").addEventListener("click", () =>{
                    localStorage.setItem("selectedField", JSON.stringify(item));

                    window.location.href= "/frontend/basic_pages/page_book_field/book_field.html";
                });

                itemsList.appendChild(itemCard);
            });
        } catch (error) {
            console.error("Error fetching items:", error);
            itemsList.innerHTML = `<p>Failed to load items. Please try again later.</p>`;
        }
    };

    // Add event listener for the filter dropdown
    filterDropdown.addEventListener("change", () => {
        const filter = filterDropdown.value;
        fetchItems(filter);
    });

    // Initial Load
    await fetchSports();
    await fetchItems();
});


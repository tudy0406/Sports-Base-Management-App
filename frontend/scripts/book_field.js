document.addEventListener("DOMContentLoaded", async function (){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const selectedField = JSON.parse(localStorage.getItem("selectedField"));
    console.log(selectedField);
    const freeHoursList = document.getElementById("free-hours");
    const bookDateInput = document.getElementById("bookDate");
    const bookButton = document.getElementById("book-button");

    const today = new Date().toISOString().slice(0, 10);
    bookDateInput.value = today; 

    const fetchHours = async(date = new Date().toJSON().slice(0, 10), fieldId = selectedField?selectedField.id:0)=>{
        try{
            console.log(`FIELD: ${selectedField.id}`);
            const response = await fetch(`http://localhost:8080/api/customer/hours?date=${date}&fieldId=${fieldId}`);
            if(!response.ok){
                throw new Error("Failed to fetch hours.");
            }

            freeHoursList.innerHTML=``;
            const hours = await response.json();

            
            if(hours.length === 0){
                bookButton.disabled = true;
                const option = document.createElement("option");
                option.value = "";
                option.textContent = "No free hours available";
                freeHoursList.appendChild(option);
            }

            console.log(hours.length);

            hours.forEach(hour => {
                const option = document.createElement("option");
                option.value = hour.startTime;
                option.textContent = hour.startTime.slice(0,5);
                freeHoursList.appendChild(option);              
            });

        }catch(error){
            console.error("Error fetching hours:", error);
            freeHoursList.innerHTML = `<option value="">Error loading hours</option>`;
        }
    }

    const reviewsCard = document.getElementById("reviews-card");
    const fetchReviews = async(fieldId = selectedField?selectedField.id:0) => {
        try{
            const response = await fetch(`http://localhost:8080/api/user/reviews?fieldId=${fieldId}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(!response.ok){
                throw new Error("Failed to fetch hours.");
            }
            reviewsCard.innerHTML=``;
            const reviews = await response.json();
            if(reviews.length === 0){
                reviewsCard.innerHTML="<p>No reviews on this field yet.<p>";
            }
            else{
                reviews.forEach(review =>{
                    console.log(review);
                    const element = document.createElement("div")
                    element.id = "review-card";
                    element.innerHTML=`
                        <p><h1>${review.customerName}</h1> Rating: ${review.rating}/5 *</p>
                        <p>${review.date}<p>
                        <p>${review.comment}</p>
                    `
                    reviewsCard.appendChild(element);
                });
            }
        }catch(error){
            console.error("Error fetching reviews:", error);

        }
    }

    if(selectedField){

        const fieldImg = document.getElementById("img-section");
        fieldImg.innerHTML = `<img src=\"/frontend/images/${selectedField.sportName}.jpg\" alt="${selectedField.sportName}"`;
        if (fieldImg) {
            fieldImg.innerHTML = `<img src="/frontend/images/${selectedField.sportName}.jpg" alt="${selectedField.sportName}">`;
        } else {
            console.error("Element with id 'img-section' not found.");
        }

        const fieldInfo = document.getElementById("info-section");
        fieldInfo.innerHTML = `
            <h2>${selectedField.name}</h2>
            <p>Sport: ${selectedField.sportName}</p>
            <p>Dimensions: ${selectedField.length}m x ${selectedField.width}m</p>
            <p id="price">Price: ${selectedField.hourPrice}(ron)/hour</p>
        `;

        await fetchHours();
        await fetchReviews();
    }

    bookDateInput.addEventListener("change", (event) => {
        const selectedDate = event.target.value;
        fetchHours(selectedDate);
    });

    bookButton.addEventListener("click", async function(event) {
        const bookingData = {
            customerId: currentUser.id,
            fieldId: selectedField.id,
            bookingDate: bookDateInput.value,
            startTime: freeHoursList.value,
            endTime: calculateEndTime(freeHoursList.value),
            totalPrice: selectedField.hourPrice,
            status: "PENDING"
        }
        try{
            const response = await fetch("http://localhost:8080/api/customer/book",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bookingData)
            });

            if(response.ok){
                const responseMessage = await response.text();
                alert(responseMessage);
                window.location.reload();
            }else{
                const errorMessage = await response.text();
                alert(`Failed to book field: ${errorMessage}`);
            }
        }catch(error){
            console.error("Error:", error);
            alert("An error occurred while booking the field. Please try again.");
        }
    })

    function calculateEndTime(startTime) {
        const start = new Date(`2025-01-01T${startTime}Z`);
        start.setHours(start.getHours() + 1); 
        return start.toISOString().slice(11, 19);
    }

    const addReviewSection = document.getElementById("addReviewSection");
    const addReview = document.getElementById("addReview");
    addReview.addEventListener("click", async function () {
        const isHidden = window.getComputedStyle(addReviewSection).display === "none";
        if (isHidden) {
            addReview.textContent = "Close";
            addReviewSection.style.display = "block";
        } else {
            addReviewSection.style.display = "none";
            addReview.textContent = "Add Review"
        }
    })

    const submitReview = document.getElementById("submit-review");
    submitReview.addEventListener("click", async function(){
        const reviewData = {
            customerId: currentUser.id,
            fieldId: selectedField.id,
            rating: document.getElementById("rating").value,
            comment: document.getElementById("comment").value,
            reviewDate: today
        }
        console.log("trying to submit");
        try{
            response = await fetch("http://localhost:8080/api/customer/addReview",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewData)
            })
            console.log(reviewData);

            if(response.ok){
                alert("Review saved");
                window.location.reload();
            }else{
                const errorMessage = await response.text();
                console.log(`Failed to save review: ${errorMessage}`);
            }

        }catch(error){
            console.error("Error saving review", error);
        }
    })
})
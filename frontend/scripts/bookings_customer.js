document.addEventListener("DOMContentLoaded", async function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const bookingsTable = document.getElementById("table-body");

    const payBooking = async(bookingId = 0) => {
        try{
            const responsePay = await fetch(`http://localhost:8080/api/customer/payBooking?bookingId=${bookingId}`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if(responsePay.ok){
                window.location.reload();
            }else{
                const errorMessage = await responsePay.text();
                alert(`Payment failed: ${errorMessage}`);
            }

        }catch(error){
            console.error("Error:", error);
            alert("An error occurred while paying booking. Please try again.");
        }
        console.log(`Paying for booking ID: ${bookingId}`);
    }

    const cancelBooking = async(bookingId = 0) => {
        try{
            const responseCancel= await fetch(`http://localhost:8080/api/user/cancelBooking?bookingId=${bookingId}`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(responseCancel.ok){
                this.location.reload();
            }else{
                const errorMessage = await responseCancel.text();
                alert(`Cancelation failed: ${errorMessage}`);
            }

        }catch(error){
            console.error("Error:", error);
            alert("An error occurred while canceling bookingt. Please try again.");
        }
        console.log(`Cancel booking ID: ${bookingId}`);
    }


    if (currentUser) {
        const fetchBookings = async (userId = currentUser.id) => {
            try {
                const response = await fetch(`http://localhost:8080/api/user/bookings?userId=${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch booking data");
                }
    
                const bookings = await response.json();
                
                const noBookingHistory = document.getElementById("noBookingHistory");
                if(bookings.length === 0){
                    noBookingHistory.style.display = "block";
                }else{
                    noBookingHistory.style.display = "none";
                }
                for (const booking of bookings) {
                    console.log(booking);
    
                    try {
                        const responseF = await fetch(`http://localhost:8080/api/user/field?fieldId=${booking.fieldId}`);
                        if (!responseF.ok) {
                            throw new Error("Failed to fetch field");
                        }
    
                        const field = await responseF.json();
                        console.log(field);
    
                        // Create a table row
                        const row = document.createElement("tr");
    
                        const idCell = document.createElement("td");
                        idCell.textContent = `${booking.id}`;
                        row.appendChild(idCell);

                        const nameCell = document.createElement("td");
                        nameCell.textContent = `${currentUser.lastName} ${currentUser.firstName}`;
                        row.appendChild(nameCell);
    
                        const dateCell = document.createElement("td");
                        dateCell.textContent = booking.bookingDate;
                        row.appendChild(dateCell);
    
                        const fieldCell = document.createElement("td");
                        fieldCell.textContent = field.name;
                        row.appendChild(fieldCell);
    
                        const startTimeCell = document.createElement("td");
                        startTimeCell.textContent = booking.startTime.slice(0,5);
                        row.appendChild(startTimeCell);
    
                        const endTimeCell = document.createElement("td");
                        endTimeCell.textContent = booking.endTime.slice(0,5);
                        row.appendChild(endTimeCell);
    
                        const priceCell = document.createElement("td");
                        priceCell.textContent = booking.totalPrice;
                        row.appendChild(priceCell);
    
                        const statusCell = document.createElement("td");
                        statusCell.textContent = booking.status;
                        row.appendChild(statusCell);
                    
                        const actionsCell = document.createElement("td");
                        
                        if(booking.status !== "CANCELED"){
                            const cancelButton = document.createElement("button");
                            cancelButton.textContent = "Cancel";
                            cancelButton.className = "cancel-button";
                            cancelButton.addEventListener("click", () => {
                                cancelBooking(booking.id);
                            });
                            actionsCell.appendChild(cancelButton);
                        }
                        if (booking.status === "PENDING") {
                            const payButton = document.createElement("button");
                            payButton.textContent = "Pay";
                            payButton.className = "pay-button";
                            payButton.addEventListener("click", () => {
                                payBooking(booking.id);
                            });
                            actionsCell.appendChild(payButton);
                        }
                        
                        row.appendChild(actionsCell);
                        
                        // Append the row to the table
                        bookingsTable.appendChild(row);
                    } catch (error) {
                        console.error("Error fetching field details:", error);
                    }
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    } else {
        console.error("No user found");
    }
});

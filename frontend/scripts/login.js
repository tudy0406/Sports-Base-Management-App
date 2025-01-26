document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("logInForm");

    loginForm.addEventListener("submit", async function (event){
        event.preventDefault();

        const formData = {
            email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value
        }

        try {
            // Send data to the backend
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            console.log(formData);

            // Handle the response
            if (response.ok) {
                // Redirect to login page or any other page
                const user = await response.json();
                
                localStorage.setItem("currentUser", JSON.stringify(user));///save User in local storage for easier future uses

                if(user.role === "customer"){
                    window.location.href = "/frontend/basic_pages/page_fields/fields.html";
                }else{
                    window.location.href = "/frontend/basic_pages/page_data_base/database.html";
                }
            } else {
                const errorMessage = await response.text();
                alert(`Failed to login: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while logging in the account. Please try again.");
        }
    });
})
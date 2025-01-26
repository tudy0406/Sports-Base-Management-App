document.addEventListener("DOMContentLoaded", function () {
    const createAccountForm = document.getElementById("createAccountForm");
    const roleSelect = document.getElementById("role");
    const employeePasswordContainer = document.getElementById("employeePasswordContainer");

    roleSelect.addEventListener("change", function () {
        if (roleSelect.value === "employee") {
            employeePasswordContainer.style.display = "block";
        } else {
            employeePasswordContainer.style.display = "none";
        }
    });

    createAccountForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            birthDate: document.getElementById("birthDate").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: document.getElementById("role").value,
            employeePassword: document.getElementById("employeePassword").value || null 
        };

        if(formData.employeePassword === null){
            formData.employeePassword = "";
        }

        try {
            const response = await fetch("http://localhost:8080/api/auth/createAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            console.log(formData);

            if (response.ok) {                
                const responseMessage = await response.text();
                alert(responseMessage);  
                window.location.href = "/frontend/basic_pages/page_login/login.html";
            } else {
                const errorMessage = await response.text();
                alert(`Failed to create account: ${errorMessage}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the account. Please try again.");
        }
    });
});

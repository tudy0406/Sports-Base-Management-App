document.addEventListener("DOMContentLoaded",async function (){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const fields = document.getElementById("fieldsButton");
    const options = document.getElementById("dropdown");
    const logInBtn = document.getElementById("logInBtn");
    
    const myBookingsBtn = document.getElementById("my-bookings");
    const dataBaseBtn = document.getElementById("data-base");

    if(!currentUser){

        fields.style.display="none";
        options.style.display="none";
        logInBtn.style.display="block";

    }else{
        
        logInBtn.style.display="none";
        if(currentUser.role === "employee"){

            fields.style.display="none";
            myBookingsBtn.style.display = "none";
            dataBaseBtn.style.display = "block";

        }else{

            fields.style.display = "block";
            myBookingsBtn.style.display = "block";
            dataBaseBtn.style.display = "none";

        }
    }
})
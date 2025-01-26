document.addEventListener("DOMContentLoaded", async function(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const logOutButton = document.getElementById("logOutBtn");

    console.log(currentUser);

    const infoSection = document.getElementById("info-section");

    const maskedPassword = '●'.repeat(currentUser.password.length);

    infoSection.innerHTML=`
        <h1>Name: ${currentUser.firstName} ${currentUser.lastName}</h1>
        <p>Email: ${currentUser.email}</p>
        <p id="password">Password: ${maskedPassword}</p>
        <p>Birth date: ${currentUser.birthDate}</p>
        <p>Role: ${currentUser.role}</p>
        <p>Email: ${currentUser.email}</p>
    `
    if(currentUser.role === "customer"){
        const preferedSport = document.createElement("p");
        preferedSport.textContent = `Prefered sport: ${currentUser.preferedSport}`;
        infoSection.appendChild(preferedSport);
    }else{
        const hireDate = document.createElement("p");
        const salary = document.createElement("p");
        hireDate.textContent = `Hire date: ${currentUser.hireDate}`;
        salary.textContent = `Salary: ${currentUser.salary}`;
        infoSection.appendChild(hireDate);
        infoSection.appendChild(salary);
    }

    logOutButton.addEventListener("click", ()=>{
        localStorage.removeItem("currentUser");
        window.location.href="/frontend/basic_pages/page_login/login.html";
    })
})
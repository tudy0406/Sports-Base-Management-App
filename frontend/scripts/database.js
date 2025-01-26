document.addEventListener("DOMContentLoaded", async function () {
    const API_BASE = "http://localhost:8080/api";
    const orderFilter = document.getElementById("order-by");
    const orderDir = document.getElementById("type-of-order");
    const tableHead = document.getElementById("table-header-row");
    const tableBody = document.getElementById("table_body");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const noData = document.getElementById("noData");
    const tableName = document.getElementById("table-name");
    const addButton = document.getElementById("add-button");
    const today = new Date().toISOString().slice(0, 10);

    const resetHTML = () => {
        tableHead.innerHTML = '';
        tableBody.innerHTML = '';
        addButton.textContent = "Add";
    };


    const fetchData = async (endpoint, orderBy, orderDirection) => {
        try {
            const response = await fetch(`${API_BASE}/${endpoint}?orderBy=${orderBy}&orderDirection=${orderDirection}`);
            if (response.ok) {
                return await response.json();
            } else {
                console.error(`Failed to fetch data from ${endpoint}: ${await response.text()}`);
                return [];
            }
        } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error);
            return [];
        }
    };

    const renderTable = (headers, rows, actionsCallback = null) => {
        resetHTML();

        tableHead.innerHTML = headers.map(header => `<th>${header}</th>`).join('');

        rows.forEach(row => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = Object.values(row).map(value => `<td>${value}</td>`).join('');

            if (actionsCallback) {
                const actionColumn = document.createElement("td");
                actionsCallback(row, actionColumn);
                tableRow.appendChild(actionColumn);
            }

            tableBody.appendChild(tableRow);
        });
    };

    const deleteEntity = async (className, entity) => {
        try {
            const response = await fetch(`${API_BASE}/employee/del${className}?id=${entity.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                window.location.reload();
            } else {
                console.error(`Failed to delete ${className}: ${await response.text()}`);
            }
        } catch (error) {
            console.error(`Error deleting ${className.toLowerCase()}:`, error);
        }
    }

    const editCustomer = async (row, editBtn, customer) => {
        if (editBtn.textContent === "Edit") {
            row.querySelector(`#firstName${customer.id}`).innerHTML = `<input type="text" value="${customer.firstName}">`;
            row.querySelector(`#lastName${customer.id}`).innerHTML = `<input type="text" value="${customer.lastName}">`;
            row.querySelector(`#email${customer.id}`).innerHTML = `<input type="email" value="${customer.email}">`;
            row.querySelector(`#password${customer.id}`).innerHTML = `<input type="text" value="${customer.password}">`;
            row.querySelector(`#birthDate${customer.id}`).innerHTML = `<input type="date" value="${customer.birthDate}">`;
            row.querySelector(`#preferedSport${customer.id}`).innerHTML = `<input type="text" value="${customer.preferedSport}">`;
            editBtn.textContent = "Submit";
        } else {
            const updatedUserData = {
                id: customer.id,
                firstName: row.querySelector(`#firstName${customer.id} input`).value,
                lastName: row.querySelector(`#lastName${customer.id} input`).value,
                email: row.querySelector(`#email${customer.id} input`).value,
                password: row.querySelector(`#password${customer.id} input`).value,
                birthDate: row.querySelector(`#birthDate${customer.id} input`).value,
                role: customer.role,
                preferedSport: row.querySelector(`#preferedSport${customer.id} input`).value
            };
            try {
                const response = await fetch(`${API_BASE}/employee/editCustomer`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedUserData),
                });
                if (response.ok) {
                    alert("User updated successfully");
                    loadCustomers(orderFilter.value, orderDir.value);
                } else {
                    console.error(`Failed to edit user: ${await response.text()}`);
                }
            } catch (error) {
                console.error("Error editing user:", error);
            }
            editBtn.textContent = "Edit";
        }
    }

    const editSport = async (row, editBtn, sport)=>{
        if (editBtn.textContent === "Edit") {

            row.querySelector(`#name${sport.id}`).innerHTML = `<input type="text" value="${sport.name}">`;
            row.querySelector(`#description${sport.id}`).innerHTML = `<input type="text" value="${sport.description}">`;
            editBtn.textContent = "Submit";
        
        } else {
            
            const updatedSportData = {
                id: sport.id,
                name: row.querySelector(`#name${sport.id} input`).value,
                description: row.querySelector(`#description${sport.id} input`).value,
            };
            try {
                const response = await fetch(`${API_BASE}/employee/editSport`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedSportData),
                });
                if (response.ok) {
                    alert("Sport updated successfully");
                    loadSports(orderFilter.value, orderDir.value);
                } else {
                    console.error(`Failed to edit sport: ${await response.text()}`);
                }
            } catch (error) {
                console.error("Error editing sport:", error);
            }
            editBtn.textContent = "Edit";
        }
    }

    const editField = async (row, editBtn, field) => {
        if (editBtn.textContent === "Edit") {
            row.querySelector(`#name${field.id}`).innerHTML = `<input type="text" value="${field.name}">`;
            row.querySelector(`#sportId${field.id}`).innerHTML = `<input type="number" value="${field.sportId}">`;
            row.querySelector(`#length${field.id}`).innerHTML = `<input type="number" value="${field.length}">`;
            row.querySelector(`#width${field.id}`).innerHTML = `<input type="number" value="${field.width}">`;
            row.querySelector(`#hourPrice${field.id}`).innerHTML = `<input type="number" value="${field.hourPrice}">`;
            editBtn.textContent = "Submit";
        } else {
            
            const updatedFieldData = {
                id: field.id,
                name: row.querySelector(`#name${field.id} input`).value,
                sportId: row.querySelector(`#sportId${field.id} input`).value,
                length: row.querySelector(`#length${field.id} input`).value,
                width: row.querySelector(`#width${field.id} input`).value,
                hourPrice: row.querySelector(`#hourPrice${field.id} input`).value,
                usageCountSinceMaintenance: field.usageCountSinceMaintenance,
            };
            try {
                const response = await fetch(`${API_BASE}/employee/editField`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedFieldData),
                });
                if (response.ok) {
                    alert("Field updated successfully");
                    loadFields(orderFilter.value, orderDir.value);
                } else {
                    console.error(`Failed to edit field: ${await response.text()}`);
                }
            } catch (error) {
                console.error("Error editing field:", error);
            }
            editBtn.textContent = "Edit";
        }
    }

    const addMaintenance = async (field)=>{
        try{
            const maintenanceData = {
                fieldId: field.id,
                employeeId: currentUser.id,
                maintenanceDate: today
            }

            const response = await fetch(`${API_BASE}/employee/addMaintenance`,{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body: JSON.stringify(maintenanceData)
            });
            if(response.ok){
                alert("Maintenance added successfully");
                loadFields(orderFilter.value, orderDir.value);
            }else{
                console.error(`Failed to add maintenance: ${await response.text()}`);
            }
        }catch(error){
            console.error("Error adding maintenance: ", error);
        }
    }

    const loadCustomers = async (orderBy, orderDirection) => {
        resetHTML();
        tableName.textContent = "Customers";

        addButton.style.display = "none";
        addButton.disabled = true;

        const users = await fetchData("user/getUsers",orderBy, orderDirection);
        const customers = users.filter(user => user.role === "customer");

        tableHead.innerHTML = `
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Birth Date</th>
            <th>Role</th>
            <th>Pref. Sport</th>
            <th>Actions</th>
        `;
        if(customers.length === 0){
            noData.style.display = "block";
        }
        else{
            noData.style.display = "none";
        }

        customers.forEach(customer => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${customer.id}</td>
                <td id="firstName${customer.id}">${customer.firstName}</td>
                <td id="lastName${customer.id}">${customer.lastName}</td>
                <td id="email${customer.id}">${customer.email}</td>
                <td id="password${customer.id}">${'●'.repeat(customer.password.length)}</td>
                <td id="birthDate${customer.id}">${customer.birthDate}</td>
                <td>${customer.role}</td>
                <td id="preferedSport${customer.id}">${customer.preferedSport}</td>
            `;

            const actionColumn = document.createElement("td");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "edit-buttons";
            editBtn.id = "edit-button";
            editBtn.addEventListener("click", async () => {
               editCustomer(row, editBtn, customer);
            });
            actionColumn.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "edit-buttons";
            deleteBtn.id = "delete-button";
            deleteBtn.addEventListener("click", async () => {
                deleteEntity("Customer", customer);
            });
            actionColumn.appendChild(deleteBtn);

            row.appendChild(actionColumn);
            tableBody.appendChild(row);
        });
    };

    const loadEmployees = async (orderBy, orderDirection) => {
        resetHTML();
        tableName.textContent = "Employees";

        addButton.style.display = "none";
        addButton.disabled = true;

        const users = await fetchData("user/getUsers",orderBy, orderDirection);
        const employees = users.filter(user => user.role === "employee");

        renderTable(
            ["Id", "First Name", "Last Name","Email", "Password", "BirthDate", "Role", "Salary", "HireDate"],
            employees
        )

        if(employees.length === 0){
            noData.style.display = "block";
        }
        else{
            noData.style.display = "none";
        }

    };

    const loadSports = async(orderBy, orderDirection) =>{
        resetHTML();
        tableName.textContent = "Sports";
        addButton.style.display = "block";
        addButton.disabled = false;

            const sports = await fetchData("employee/getSports", orderBy, orderDirection);
            tableHead.innerHTML = `
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                `;
            if(sports.length === 0){
                noData.style.display = "block";
            }
            else{
                noData.style.display = "none";
            }
            

            sports.forEach(sport =>{
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${sport.id}</td>
                    <td id="name${sport.id}">${sport.name}</td>
                    <td id="description${sport.id}">${sport.description}</td>
                `;

                const actionColumn = document.createElement("td");

                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.className = "edit-buttons";
                editBtn.id = "edit-button";
                editBtn.addEventListener("click", async () => {
                    editSport(row, editBtn, sport);
                });
                actionColumn.appendChild(editBtn);

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.className = "edit-buttons";
                deleteBtn.id = "delete-button";
                deleteBtn.addEventListener("click", async () => {
                    deleteEntity("Sport", sport);
                });
                actionColumn.appendChild(deleteBtn);

                
                row.appendChild(actionColumn);
                tableBody.appendChild(row);
             });
    }

    const loadFields = async(orderBy, orderDirection) => {
        resetHTML();
        tableName.textContent = "Fields";
        addButton.style.display = "block";
        addButton.disabled = false;
        try{
            const fields = await fetchData("employee/getFields", orderBy, orderDirection);
            tableHead.innerHTML = `
                    <th>Id</th>
                    <th>Name</th>
                    <th>Sport Id</th>
                    <th>Length</th>
                    <th>Width</th>
                    <th>Hour Price</th>
                    <th>Usage Since Maint.</th>
                    <th>Actions</th>
                `;
            if(fields.length === 0){
                noData.style.display = "block";
            }
            else{
                noData.style.display = "none";
            }
            fields.forEach(field =>{
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${field.id}</td>
                    <td id="name${field.id}">${field.name}</td>
                    <td id="sportId${field.id}">${field.sportId}</td>
                    <td id="length${field.id}">${field.length}</td>
                    <td id="width${field.id}">${field.width}</td>
                    <td id="hourPrice${field.id}">${field.hourPrice}</td>
                    <td id="usageCount${field.id}">${field.usageCountSinceMaintenance}</td>
                `;

                const actionColumn = document.createElement("td");

                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.className = "edit-buttons";
                editBtn.id = "edit-button";
                editBtn.addEventListener("click", async () => {
                    editField(row, editBtn, field);
                });
                actionColumn.appendChild(editBtn);


                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.className = "edit-buttons";
                deleteBtn.id = "delete-button";
                deleteBtn.addEventListener("click", async () => {
                    deleteEntity("Field", field);
                });
                actionColumn.appendChild(deleteBtn);

                const maintenanceBtn = document.createElement("button");
                maintenanceBtn.textContent = "Maintenance";
                maintenanceBtn.className = "edit-buttons";
                maintenanceBtn.id = "maintenance-button";
                maintenanceBtn.addEventListener("click", async() =>{
                    addMaintenance(field);
                })
                if(field.usageCountSinceMaintenance != 0){
                    actionColumn.appendChild(maintenanceBtn);
                }
                row.appendChild(actionColumn);
                tableBody.appendChild(row);
            })
        }catch(error){
            console.error("Error fetching fields", error);
        }
    }

    const loadMaintenances = async(orderBy,orderDirection) => {
        resetHTML();
        tableName.textContent = "Maintenances";

        addButton.style.display = "none";
        addButton.disabled = true;

        const maintenances = await fetchData("employee/getMaintenances", orderBy, orderDirection);
        renderTable(
            ["Id", "Field Id", "Employee Id", "Maintance Date"],
            maintenances
        )

        if(maintenances.length === 0){
            noData.style.display = "block";
        }
        else{
            noData.style.display = "none";
        }
    }

    const loadReviews = async(orderBy,orderDirection) => {
        resetHTML();
        tableName.textContent = "Reviews";

        addButton.style.display = "none";
        addButton.disabled = true;

        const reviews = await fetchData("employee/getReviews", orderBy, orderDirection);
        renderTable(
            ["Id", "Customer Id", "Field Id", "Rating", "Comment", "Review Date"],
            reviews
        )

        if(reviews.length === 0){
            noData.style.display = "block";
        }
        else{
            noData.style.display = "none";
        }
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
                loadBookings(orderFilter.value, orderDir.value)
            }else{
                const errorMessage = await responseCancel.text();
                alert(`Cancelation failed: ${errorMessage}`);
            }

        }catch(error){
            console.error("Error:", error);
            alert("An error occurred while canceling bookingt. Please try again.");
        }
    }

    const loadBookings = async(orderBy, orderDirection) => {
        resetHTML();
        tableName.textContent = "Bookings";

        addButton.style.display = "none";
        addButton.disabled = true;

        try{
            const bookings = await fetchData("employee/getBookings", orderBy, orderDirection);
            if(bookings.length === 0){
                noData.style.display = "block";
            }
            else{
                noData.style.display = "none";
            }

            tableHead.innerHTML = `
                    <th>Id</th>
                    <th>Customer Id</th>
                    <th>Field Id</th>
                    <th>Book. Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                `;
            bookings.forEach(booking =>{
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${booking.id}</td>
                    <td id="customerId${booking.id}">${booking.customerId}</td>
                    <td id="fieldId${booking.id}">${booking.fieldId}</td>
                    <td id="bookingDate${booking.id}">${booking.bookingDate}</td>
                    <td id="startTime${booking.id}">${booking.startTime}</td>
                    <td id="endTime${booking.id}">${booking.endTime}</td>
                    <td id="totalPrice${booking.id}">${booking.totalPrice}</td>
                    <td id="status${booking.id}">${booking.status}</td>
                `;

                const actionColumn = document.createElement("td");

                const cancelBtn = document.createElement("button");
                cancelBtn.textContent = "Cancel";
                cancelBtn.className = "edit-buttons";
                cancelBtn.id = "delete  -button";
                cancelBtn.addEventListener("click", async () => {
                    cancelBooking(booking.id);
                });

                if(booking.status != "CANCELED"){
                    actionColumn.appendChild(cancelBtn);
                }

                row.appendChild(actionColumn);
                tableBody.appendChild(row);
            });
        }catch(error){
            console.error("Error laoding bookings: ", error);
        }
    }

    const loadPayments = async(orderBy,orderDirection) => {
        resetHTML();
        tableName.textContent = "Payments";

        addButton.style.display = "none";
        addButton.disabled = true;

        const payments = await fetchData("employee/getPayments", orderBy, orderDirection);
        renderTable(
            ["Id", "Booking Id", "Payment Date", "Amount", "Status"],
            payments
        )

        if(payments.length === 0){
            noData.style.display = "block";
        }
        else{
            noData.style.display = "none";
        }
    }

    const customersBtn = document.getElementById("Customers");
    const employeesBtn = document.getElementById("Employees");
    const sportsBtn = document.getElementById("Sports");
    const fieldsBtn = document.getElementById("Fields");
    const maintenancesBtn = document.getElementById("Maintenances");
    const reviewsBtn = document.getElementById("Reviews");
    const bookingsBtn = document.getElementById("Bookings");
    const paymentsBtn = document.getElementById("Payments");

    customersBtn.addEventListener("click", () => {
        customersBtn.className="active";
        employeesBtn.className="inactive";
        sportsBtn.className="inactive";
        fieldsBtn.className="inactive";
        maintenancesBtn.className="inactive";
        reviewsBtn.className="inactive";
        bookingsBtn.className="inactive";
        paymentsBtn.className="inactive";

        orderFilter.innerHTML=`
            <option value="id" selected="selected">Id</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="birthDate">Birth Date</option>
            <option value="preferedSport">Pref. Sport</option>
        `;
        loadCustomers(orderFilter.value, orderDir.value);
    })

    employeesBtn.addEventListener("click", () => {
        customersBtn.className="inactive";
        employeesBtn.className="active";
        sportsBtn.className="inactive";
        fieldsBtn.className="inactive";
        maintenancesBtn.className="inactive";
        reviewsBtn.className="inactive";
        bookingsBtn.className="inactive";
        paymentsBtn.className="inactive";

        orderFilter.innerHTML=`
            <option value="id" selected="selected">Id</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="birthDate">Birth Date</option>
            <option value="hireDate">Hire Date</option>
        `;
        loadEmployees(orderFilter.value, orderDir.value);
    })

    sportsBtn.addEventListener("click", () => {
        customersBtn.className="inactive";
        employeesBtn.className="inactive";
        sportsBtn.className="active";
        fieldsBtn.className="inactive";
        maintenancesBtn.className="inactive";
        reviewsBtn.className="inactive";
        bookingsBtn.className="inactive";
        paymentsBtn.className="inactive";

        orderFilter.innerHTML=`
            <option value="id" selected="selected">Id</option>
            <option value="name">Name</option>
        `;
        loadSports(orderFilter.value, orderDir.value);
    })

    fieldsBtn.addEventListener("click", () => {
        customersBtn.className="inactive";
        employeesBtn.className="inactive";
        sportsBtn.className="inactive";
        fieldsBtn.className="active";
        maintenancesBtn.className="inactive";
        reviewsBtn.className="inactive";
        bookingsBtn.className="inactive";
        paymentsBtn.className="inactive";
        
        orderFilter.innerHTML=`
            <option value="id" selected="selected">Id</option>
            <option value="name">Name</option>
            <option value="sportId">Sport Id</option>
            <option value="length">Length</option>
            <option value="width">Width</option>
            <option value="hourPrice">Price/Hour</option>
            <option value="usageCountSinceMaintenance">Usage Count</option>
        `;
        loadFields(orderFilter.value, orderDir.value);
    })
    maintenancesBtn.addEventListener("click", () => {
        customersBtn.className="inactive";
        employeesBtn.className="inactive";
        sportsBtn.className="inactive";
        fieldsBtn.className="inactive";
        maintenancesBtn.className="active";
        reviewsBtn.className="inactive";
        bookingsBtn.className="inactive";
        paymentsBtn.className="inactive";
        
        orderFilter.innerHTML=`
            <option value="id" selected="selected">Id</option>
            <option value="fieldId">Field Id</option>
            <option value="employeeId">Employee Id</option>
            <option value="maintenanceDate">Maint. Date</option>
        `;
        loadMaintenances("id", orderDir.value);
    })
    reviewsBtn.addEventListener("click", () => {
        customersBtn.className="inactive";
        employeesBtn.className="inactive";
        sportsBtn.className="inactive";
        fieldsBtn.className="inactive";
        maintenancesBtn.className="inactive";
        reviewsBtn.className="active";
        bookingsBtn.className="inactive";
        paymentsBtn.className="inactive";
        
        orderFilter.innerHTML=`
            <option value="id" selected="selected">Id</option>
            <option value="customerId">Customer Id</option>
            <option value="fieldId">Field Id</option>
            <option value="rating">Rating</option>
            <option value="reviewDate">Review Date</option>
        `;
        loadReviews(orderFilter.value, orderDir.value);
    })
    bookingsBtn.addEventListener("click", () => {
        customersBtn.className="inactive";
        employeesBtn.className="inactive";
        sportsBtn.className="inactive";
        fieldsBtn.className="inactive";
        maintenancesBtn.className="inactive";
        reviewsBtn.className="inactive";
        bookingsBtn.className="active";
        paymentsBtn.className="inactive";
        
        orderFilter.innerHTML=`
            <option value="id" selected="selected">Id</option>
            <option value="customerId">Customer Id</option>
            <option value="fieldId">Field Id</option>
            <option value="bookingDate">Book. Date</option>
            <option value="totalPrice">Price</option>
            <option value="status">Status</option>
        `;
        loadBookings(orderFilter.value, orderDir.value);
    })
    paymentsBtn.addEventListener("click", () => {
        customersBtn.className="inactive";
        employeesBtn.className="inactive";
        sportsBtn.className="inactive";
        fieldsBtn.className="inactive";
        maintenancesBtn.className="inactive";
        reviewsBtn.className="inactive";
        bookingsBtn.className="inactive";
        paymentsBtn.className="active";
        
        orderFilter.innerHTML=`
            <option value="id" selected="selected">Id</option>
            <option value="bookingId">Book. Id</option>
            <option value="paymentDate">Pay. Date</option>
            <option value="amount">Amount</option>
            <option value="status">Status</option>
        `;
        loadPayments(orderFilter.value, orderDir.value);
    })

    orderFilter.addEventListener("change", async()=> {
        if(customersBtn.className === "active"){
            loadCustomers(orderFilter.value, orderDir.value);
        }else if(employeesBtn.className === "active"){
            loadEmployees(orderFilter.value, orderDir.value);
        }else if(sportsBtn.className === "active"){
            loadSports(orderFilter.value, orderDir.value);
        }else if(fieldsBtn.className === "active"){
            loadFields(orderFilter.value, orderDir.value);
        }else if(maintenancesBtn.className === "active"){
            loadMaintenances(orderFilter.value, orderDir.value);
        }else if(reviewsBtn.className === "active"){
            loadReviews(orderFilter.value, orderDir.value);
        }else if(bookingsBtn.className === "active"){
            loadBookings(orderFilter.value, orderDir.value);
        }else if(paymentsBtn.className === "active"){
            loadPayments(orderFilter.value, orderDir.value);
        }
    })

    orderDir.addEventListener("change", () => {
        if(customersBtn.className === "active"){
            loadCustomers(orderFilter.value, orderDir.value);
        }else if(employeesBtn.className === "active"){
            loadEmployees(orderFilter.value, orderDir.value);
        }else if(sportsBtn.className === "active"){
            loadSports(orderFilter.value, orderDir.value);
        }else if(fieldsBtn.className === "active"){
            loadFields(orderFilter.value, orderDir.value);
        }else if(maintenancesBtn.className === "active"){
            loadMaintenances(orderFilter.value, orderDir.value);
        }else if(reviewsBtn.className === "active"){
            loadReviews(orderFilter.value, orderDir.value);
        }else if(bookingsBtn.className === "active"){
            loadBookings(orderFilter.value, orderDir.value);
        }else if(paymentsBtn.className === "active"){
            loadPayments(orderFilter.value, orderDir.value);
        }
    })

    const addData = async(newRow)=>{

        if(sportsBtn.className === "active"){
                
        }
    }

    addButton.addEventListener("click", async () =>{
        if(addButton.textContent === "Add"){
            const addRow = document.createElement("tr");
            addRow.id = "add-row";
            if(tableName.textContent === "Sports"){
                addRow.innerHTML=`
                    <td></td>
                    <td><input type="text" id="addName" placeholder="Enter sport name" required></td>
                    <td><input type="text" id="addDescription" placeholder="Describe sport" required></td>
                `;
            }else if(tableName.textContent === "Fields"){
                addRow.innerHTML=`
                    <td></td>
                    <td><input type="text" id="addName" placeHolder="Enter field name" required></td>
                    <td><input type="number" id="addSportId" placeHolder="Enter Sport Id" required></td>
                    <td><input type="number" id="addLength" placeHolder="Enter field length" required></td>
                    <td><input type="number" id="addWidth" placeHolder="Enter field width" required></td>
                    <td><input type="number" id="addPrice" placeHolder="Enter price/hour" required></td>
                    <td>0</td>
                `;
            }
            tableBody.appendChild(addRow);
            addButton.textContent = "Submit";
        }else{

            addButton.textContent = "Add";
            const newRow = document.getElementById("add-row");
            if(tableName.textContent === "Sports"){
                const newSportData={
                    name: newRow.querySelector("#addName").value,
                    description: newRow.querySelector("#addDescription").value
                }
                try{
                    const response = await fetch(`${API_BASE}/employee/addSport`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newSportData)
                    });
                    if(response.ok){
                        loadSports(orderFilter.value, orderDir.value);
                    }else{
                        const errorMessage = response.text();
                        console.error(`Failed to add Sport ${errorMessage}`);
                    }
                }catch(error){
                    console.error("Error", error);
                }
            } else if(tableName.textContent === "Fields"){
                const newFieldData={
                    name: newRow.querySelector("#addName").value,
                    sportId: newRow.querySelector("#addSportId").value,
                    length: newRow.querySelector("#addLength").value,
                    width: newRow.querySelector("#addWidth").value,
                    hourPrice: newRow.querySelector("#addPrice").value
                }
                try{
                    const response = await fetch(`${API_BASE}/employee/addField`,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(newFieldData)
                    });
                    if(response.ok){
                        loadFields(orderFilter.value, orderDir.value);
                    }else{
                        const errorMessage = response.text();
                        console.error(`Failed to add Sport ${errorMessage}`);
                    }
                }catch(error){
                    console.error("Error", error);
                }
            }
        }
            
    })

    resetHTML();
    orderFilter.innerHTML=`
            <option value="id" selected="selected">Id</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="birthDate">Birth Date</option>
            <option value="preferedSport">Pref. Sport</option>
        `;
    customersBtn.className = "active";

    await loadCustomers(orderFilter.value, orderDir.value);
})

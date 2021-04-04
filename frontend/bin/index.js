const prompt = require('prompt-sync')({ sigint: true });
require('dotenv').config()
const { Pool, Client } = require('pg')
const pool = new Pool({
    user: process.env.USER,
    host: 'web0.eecs.uottawa.ca',
    database: 'group_b01_g03',
    password: process.env.PASS,
    port: 15432,
})

try {
    welcome()
} catch (err) {
    console.log(err);
    console.log("Please try again");
    welcome();
}


function welcome() {
    console.log("Welcome to the Hotel Booking Software");
    console.log("Are you an admin, customer, or employee?")
    console.log('1. Admin');
    console.log('2. Employee');
    console.log('3. Customer');
    let selection = prompt();
    while (selection != "1" && selection != "2" && selection != "3") {
        console.log('Please enter 1 2 or 3.');
        selection = prompt();
    }

    if (selection == 1) {
        admin();
    } else if (selection == 2) {
        employee();
    } else if (selection == 3) {
        customer();
    }
}

async function admin() {
    console.log("Welcome Admin");
    console.log("Here are the current Hotel Brands in the database");

    let result = await pool.query('SELECT * FROM HotelBrand');
    console.log(result['rows']);

    let brand_ids = []
    result['rows'].forEach(row => {
        brand_ids.push(row['brand_id'])
    })

    brandOptions(brand_ids);

}

async function brandOptions(brand_ids) {

    console.log("Would you like to edit a Brand? Or view specific Hotel Chains?");
    console.log("1. Edit Brand");
    console.log("2. Delete Brand");
    console.log("3. Insert Brand");
    console.log("4. View Chains");
    console.log('q. Start Over')
    let selection = prompt();
    while (selection != "1" && selection != "2" && selection != "3" && selection != "4" && selection != 'q') {
        console.log('Please enter 1 2 3 or 4.');
        selection = prompt();
    }
    if (selection == 1) {
        editBrand(brand_ids);
    } else if (selection == 2) {
        deleteBrand(brand_ids);
    } else if (selection == 3) {
        insertBrand();
    } else if (selection == 4) {
        viewChains(brand_ids);
    } else if (selection == 'q') {
        admin();
    }
}

async function editBrand(brand_ids) {

    console.log("Enter the ID of the Brand you would like to Update");
    selection = prompt();
    while (!brand_ids.includes(Number(selection))) {
        console.log("Please enter an ID from the Current Brands");
        selection = prompt();
    }
    brand_name = prompt("Brand Name ");
    central_office_location = prompt("Office Location ");
    street_num = prompt("Street Num ");
    street_name = prompt("Street Name ");
    city = prompt("City ");
    zip = prompt("Zip ");
    email = prompt("Email ")
    phone_num = prompt("Phone Number ");

    await pool.query(`UPDATE HotelBrand SET brand_name='${brand_name}', central_office_location='${central_office_location}', street_num='${street_num}', street_name='${street_name}',
     city='${city}', zip='${zip}', email='${email}', phone_num='${phone_num}' WHERE brand_id = ${Number(selection)}`);

    admin();
}

async function deleteBrand(brand_ids) {

    console.log("Enter the ID of the Brand you would like to Delete");
    selection = prompt();
    while (!brand_ids.includes(Number(selection))) {
        console.log("Please enter an ID from the Current Brands");
        selection = prompt();
    }
    await pool.query(`DELETE FROM HotelBrand WHERE brand_id = ${Number(selection)}`);
    console.log("Brand Successfully Deleted");

    admin();

}

async function insertBrand() {

    brand_name = prompt("Brand Name ");
    central_office_location = prompt("Office Location ");
    street_num = prompt("Street Num ");
    street_name = prompt("Street Name ");
    city = prompt("City ");
    zip = prompt("Zip ");
    email = prompt("Email ")
    Phone_num = prompt("Phone Number ");
    num_hotels = 0;

    await pool.query(`Insert into HotelBrand(brand_name, central_office_location, street_num, street_name, city, zip, email, phone_num, num_hotels) VALUES('${brand_name}','${central_office_location}', '${street_num}', '${street_name}', '${city}', '${zip}', '${email}', '${phone_num}', '${num_hotels}')`);
    console.log("Brand Successfully Inserted");

    admin();
}

async function viewChains(brand_ids) {

    console.log("Enter the ID of the Brand you would like to view Chains for");
    let b_id = prompt();
    while (!brand_ids.includes(Number(b_id))) {
        console.log("Please enter an ID from the current Brands");
        b_id = prompt();
    }
    let result = await pool.query(`SELECT * FROM HotelChain c WHERE c.chain_id IN (SELECT chain_id FROM BelongsTo WHERE brand_id = ${b_id})`)
    console.log(result['rows'])

    let chain_ids = []
    result['rows'].forEach(row => {
        chain_ids.push(row['chain_id']);
    })
    chainOptions(chain_ids);

}

async function chainOptions(chain_ids) {
    console.log("1. Edit Chain");
    console.log("2. Delete Chain");
    console.log("3. Insert Chain");
    console.log("4. View Employees");
    console.log("5. View Rooms");
    console.log('q. Start Over');

    let selection = prompt();
    while (!['1', '2', '3', '4', '5', 'q'].includes(selection)) {
        console.log("Please Select an Option from the List");
    }

    if (selection == 1) {
        editChain(chain_ids)
    } else if (selection == 2) {
        deleteChain(chain_ids)
    } else if (selection == 3) {
        insertChain()
    } else if (selection == 4) {
        viewEmployees(chain_ids)
    } else if (selection == 5) {
        viewRooms(chain_ids)
    } else if (selection == 'q') {
        admin();
    }
}

async function editChain(chain_ids) {

    console.log("Enter the ID of the Chain you would like to Update");
    selection = prompt();
    while (!chain_ids.includes(Number(selection))) {
        console.log("Please enter an ID from the Current Chains");
        selection = prompt();
    }
    chain_name = prompt("Chain Name: ");
    street_num = prompt("Street Num: ");
    street_name = prompt("Street Name: ");
    prov = prompt("Prov: ");
    zip = prompt("Zip: ");
    num_stars = prompt("Stars: ");
    email = prompt("Email: ")
    parent_brand = prompt("Parent Brand: ");

    await pool.query(`UPDATE HotelChain SET chain_name='${chain_name}', street_num='${street_num}', street_name='${street_name}',
     prov='${prov}', zip='${zip}', email='${email}', parent_brand='${parent_brand}' WHERE chain_id = ${Number(selection)}`);

    chain_options(chain_ids);

}

async function deleteChain(chain_ids) {

    console.log("Enter the ID of the Chain you would like to Delete");
    selection = prompt();
    while (!chain_ids.includes(Number(selection))) {
        console.log("Please enter an ID from the Current Chains");
        selection = prompt();
    }
    await pool.query(`DELETE FROM HotelBrand WHERE brand_id = ${Number(selection)}`);
    console.log("Brand Successfully Deleted");


    admin()

}

async function insertChain() {


    console.log("IMPORTANT: PARENT BRAND MUST BE AN ALREADY EXISTING BRAND");

    chain_name = prompt("Chain Name: ");
    street_num = prompt("Street Num: ");
    street_name = prompt("Street Name: ");
    prov = prompt("Prov: ");
    zip = prompt("Zip: ");
    num_stars = parseInt(prompt("Stars: "));
    email = prompt("Email: ")
    parent_brand = prompt("Parent Brand: ");
    num_rooms = 0;

    let chain = await pool.query(`Insert into HotelChain(chain_name, street_num, street_name, prov, zip, num_stars, num_rooms, email, parent_brand) 
    VALUES('${chain_name}','${street_num}', '${street_name}', '${prov}', '${zip}', '${num_stars}', '${num_rooms}', '${email}', '${parent_brand}')`);
    console.log("Chain Successfully Inserted");
    admin()

}

async function viewEmployees(chain_ids) {

    console.log("Enter the ID of the Chain you would like to view Employees for");
    let c_id = prompt();
    while (!chain_ids.includes(Number(c_id))) {
        console.log("Please enter an ID from the current Brands");
        c_id = prompt();
    }
    let result = await pool.query(`SELECT * FROM Employee e WHERE e.employee_id IN (SELECT employee_id FROM WorksAt WHERE chain_id = ${Number(c_id)})`)
    let employee_ids = []
    result['rows'].forEach(row => {
        rooom_ids.push(row['employee_id'])
    })

    employeeOptions(employee_ids);

}

async function viewRooms(chain_ids) {

    console.log("Enter the ID of the Chain you would like to view Rooms for");
    let c_id = prompt();
    while (!chain_ids.includes(Number(c_id))) {
        console.log("Please enter an ID from the current Brands");
        c_id = prompt();
    }
    let result = await pool.query(`SELECT * FROM Room r WHERE r.chain_id = ${Number(c_id)}`)
    let room_ids = []
    result['rows'].forEach(row => {
        rooom_ids.push(row['room_id'])
    })

    roomOptions(room_ids);

}

async function roomOptions(room_ids) {
    console.log("1. Edit Room");
    console.log("2. Delete Room");
    console.log("3. Insert Room");
    console.log("4. View Bookings");
    console.log('5. View History');
    console.log('q. Start Over');

    let selection = prompt();
    while (!['1', '2', '3', '4', '5', 'q'].includes(selection)) {
        console.log("Please Select an Option from the List");
    }

    if (selection == 1) {
        editRoom(room_ids)
    } else if (selection == 2) {
        deleteRoom(room_ids)
    } else if (selection == 3) {
        insertRoom()
    } else if (selection == 4) {
        viewBookings(room_ids)
    } else if (selection == 4) {
        viewHistory(room_ids)
    } else if (selection == 'q') {
        admin();
    }
}

async function editRoom(room_ids) {

    console.log("Enter the ID of the Room you would like to Update");
    selection = prompt();
    while (!room_ids.includes(Number(selection))) {
        console.log("Please enter an ID from the Current Chains");
        selection = prompt();
    }
    inst_amenity = prompt("Chain Name: ");
    room_capacity = Number(prompt("Room Capacity: "));
    extendable = Boolean(prompt("Extendable? (True or False): "));
    is_view = Boolean(prompt("View? (True or False):"));
    room_price = Number(prompt("Price?: "));
    room_type = prompt("Type?: ");

    await pool.query(`UPDATE Room SET inst_amenity='${inst_amenity}', room_capacity='${room_capacity}', extendable='${extendable}',
    room_price='${room_price}', room_type='${room_type}' WHERE room_id = ${Number(selection)}`);

    admin();

}

async function deleteRoom(room_ids) {

    console.log("Enter the ID of the Room you would like to Delete");
    selection = prompt();
    while (!room_ids.includes(Number(selection))) {
        console.log("Please enter an ID from the Current Rooms");
        selection = prompt();
    }
    await pool.query(`DELETE FROM Room WHERE room_id = ${Number(selection)}`);
    console.log("Room Successfully Deleted");
    admin();

}

async function insertRoom() {


    console.log("IMPORTANT: CHAIN MUST HAVE EMPLOYEES TO ASSIGN TO ROOMS BEFORE ADDING A ROOM TO THE CHAIN");

    inst_amenity = prompt("Chain Name: ");
    room_capacity = Number(prompt("Room Capacity: "));
    extendable = Boolean(prompt("Extendable? (True or False): "));
    is_view = Boolean(prompt("View? (True or False):"));
    room_price = Number(prompt("Price?: "));
    room_type = prompt("Type?: ");

    let chain = await pool.query(`Insert into Room(inst_amenity, room_capacity, extendable, is_view, room_price, room_type) 
    VALUES('${inst_amenity}',${room_capacity}, ${extendable}, ${is_view}, ${room_price}, '${room_type}'`);
    console.log("Room Successfully Inserted");
    admin();
}

async function viewBookings(room_ids) {
    console.log("Enter the ID of the Room you would like to view Bookings for");
    let r_id = prompt();
    while (!room_ids.includes(Number(r_id))) {
        console.log("Please enter an ID from the current Rooms");
        r_id = prompt();
    }
    let result = await pool.query(`SELECT * FROM BookingInfo bi WHERE bi.room_id = ${Number(r_id)})`)
    let booking_ids = []
    result['rows'].forEach(row => {
        booking_ids.push(row['booking_id'])
    })

    console.log(result['rows']);
    admin();
    
}

async function employeeOptions(employee_ids) {
    console.log("1. Edit Employee");
    console.log("2. Delete Employee");
    console.log("3. Insert Employee");
    console.log('q. Start Over');

    let selection = prompt();
    while (!['1', '2', '3', 'q'].includes(selection)) {
        console.log("Please Select an Option from the List");
    }

    if (selection == 1) {
        editEmployee(employee_ids)
    } else if (selection == 2) {
        deleteEmployee(employee_ids)
    } else if (selection == 3) {
        insertEmployee()
    } else if (selection == 'q') {
        admin();
    }
}

async function editEmployee(employee_ids) {

    console.log("Enter the ID of the Employee you would like to Update");
    selection = prompt();
    while (!employee_ids.includes(Number(selection))) {
        console.log("Please enter an ID from the Current Employees");
        selection = prompt();
    }

    sin_num = prompt("Sin Num: ");
    first_name = prompt("First Name: ");
    last_name = prompt("Last Name: ");
    street_num = prompt("Street Num: ");
    street_name = prompt("Street Name");
    city = prompt("City: ");
    prov = prompt("Province: ");
    zip = prompt("Zip: ");
    salary = Number(prompt("Salary: "));
    inst_position = prompt("Inst Position: ");
    works_at = prompt("Works At: ");

    let chain = await pool.query(`UPDATE Employee
    SET sin_num='${sin_num}', first_name='${first_name}', last_name='${last_name}', street_num='${street_num}', street_name='${street_name}',
     city='${city}', prov='${prov}', zip='${zip}', salary=${salary}, inst_position='${inst_position}', works_at='${works_at}'`);
    console.log("Employee Successfully Updated");
    admin();

}

async function deleteEmployee(employee_ids) {

    console.log("Enter the ID of the Employee you would like to Delete");
    selection = prompt();
    while (!employee_ids.includes(Number(selection))) {
        console.log("Please enter an ID from the Current Employees");
        selection = prompt();
    }
    await pool.query(`DELETE FROM Employee WHERE employee_id = ${Number(selection)}`);
    console.log("Employee Successfully Deleted");
    admin();

}

async function insertEmployee() {


    console.log("IMPORTANT: CHAIN MUST HAVE EXIST TO ADD AN EMPLOYEE TO THE CHAIN");

    sin_num = prompt("Sin Num: ");
    first_name = prompt("First Name: ");
    last_name = prompt("Last Name: ");
    street_num = prompt("Street Num: ");
    street_name = prompt("Street Name");
    city = prompt("City: ");
    prov = prompt("Province: ");
    zip = prompt("Zip: ");
    salary = Number(prompt("Salary: "));
    inst_position = prompt("Inst Position: ");
    works_at = prompt("Works At: ");

    let chain = await pool.query(`Insert into Employee(sin_num, first_name, last_name,
        street_num, street_name, city, prov, zip, salary, inst_position, works_at) 
    VALUES('${sin_num}', '${first_name}', '${last_name}', '${street_num}', '${street_name}',
     '${city}', '${prov}', '${zip}', ${salary}, '${inst_position}', '${works_at}'`);
    console.log("Employee Successfully Inserted");
    admin();
}

async function employee() {
    console.log("Welcome Employee");
    let sin = prompt("Please enter your SIN: ");
    let result = await pool.query(`SELECT * FROM employee WHERE sin_num = ${sin}`);
    while(len(result["rows"]) == 0){
        console.log("invalid SIN.");
        sin = prompt("Please enter your SIN: ");
        result = await pool.query(`SELECT * FROM employee WHERE sin_num = ${sin}`);
    }
    let employee_id = result["rows"][0]["employee_id"] 
    employeeMenu(employee_id);
}

async function employeeMenu(employee_id) {
    console.log("Select 1 to view all rented rooms.");
    console.log("Select 2 to view all available rooms.");
    console.log("Select 3 to book a room for a customer.");
    console.log("Select 4 to insert a customer payment.");

    choice = prompt();
    while (choice != 1 && choice != 2 && choice != 3 && choice != 4) {
        console.log("Please enter 1, 2, 3, or 4");
    }
    if (choice == 1) {
        viewRentedRooms(employee_id);
    } else if (choice == 2) {
        viewAvailableRooms(employee_id);
    } else if (choice == 3) {
        bookRoom(employee_id);
    } else if (choice == 4) {
        insertPayment(employee_id);
    }
}

async function viewRentedRooms(employee_id) {
    result = await pool.query(`SELECT * FROM Room WHERE room_id IN (SELECT room_id FROM books WHERE employee_id = ${employee_id} AND customer_id IS NOT NULL)`);
    console.log(result["rows"]);
    employeeMenu(employee_id);
}

async function viewAvailableRooms(employee_id) {
    result = await pool.query(`SELECT * FROM Room WHERE room_id IN (SELECT room_id FROM books WHERE employee_id = ${employee_id} AND customer_id IS NULL)`);
    console.log(result["rows"]);
    employeeMenu(employee_id);
}


function customer() {
    console.log("Are you a current customer or new customer?")
    console.log("1. New")
    console.log("2. Existing")
    choice = prompt();
    while (choice != 1 && choice != 2) {
        console.log("Please enter 1 or 2");
    }
}
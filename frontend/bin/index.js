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

welcome()

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
    } else if (selection == 6) {
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
    room_price = Number(prompt("Price: "));
    email = prompt("Email: ")
    parent_brand = prompt("Parent Brand: ");

    await pool.query(`UPDATE HotelChain SET chain_name='${chain_name}', street_num='${street_num}', street_name='${street_name}',
     prov='${prov}', zip='${zip}', email='${email}', parent_brand='${parent_brand}' WHERE chain_id = ${Number(selection)}`);

    chain_options(chain_ids);

}

async function deleteChain(chain_ids) {

    console.log("Enter the ID of the Chain you would like to Delete");
    selection = prompt();
    while (!brand_ids.includes(Number(selection))) {
        console.log("Please enter an ID from the Current Brands");
        selection = prompt();
    }
    await pool.query(`DELETE FROM HotelBrand WHERE brand_id = ${Number(selection)}`);
    console.log("Brand Successfully Deleted");


    const index = chain_ids.indexOf(Number(selection));
    chain_ids.splice(index, 1);
    chainOptions(chain_ids);

}

async function insertChain() {


    console.log("IMPORTANT: PARENT BRAND MUST BE AN ALREADY EXISTING BRAND");

    chain_name = prompt("Chain Name: ");
    street_num = prompt("Street Num: ");
    street_name = prompt("Street Name: ");
    prov = prompt("Prov: ");
    zip = prompt("Zip: ");
    num_stars = parseInt(prompt("Stars: "));
    room_price = Number(prompt("Price: "));
    email = prompt("Email: ")
    parent_brand = prompt("Parent Brand: ");
    num_rooms = 0;

    let chain = await pool.query(`Insert into HotelChain(chain_name, street_num, street_name, prov, zip, num_stars, num_rooms, room_price, email, parent_brand) 
    VALUES('${chain_name}','${street_num}', '${street_name}', '${prov}', '${zip}', '${num_stars}', '${num_rooms}', '${room_price}', '${email}', '${parent_brand}')`);
    console.log("Chain Successfully Inserted");
    console.log(admin);

}

async function viewEmployees(chain_ids) {

    console.log("Enter the ID of the Chain you would like to view Employees for");
    let c_id = prompt();
    while (!chain_ids.includes(Number(c_id))) {
        console.log("Please enter an ID from the current Brands");
        c_id = prompt();
    }
    let result = await pool.query(`SELECT * FROM HotelChain c WHERE c.chain_id IN (SELECT chain_id FROM BelongsTo WHERE brand_id = ${b_id})`)
    console.log(result['rows'])

    let chain_ids = []
    result['rows'].forEach(row => {
        chain_ids.push(row['chain_id']);
    })
    chainOptions(chain_ids);

}

function employee() {

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
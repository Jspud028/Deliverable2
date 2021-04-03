const prompt = require('prompt-sync')({sigint: true});
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
    console.log('1. Admin')
    console.log('2. Employee')
    console.log('3. Customer');
    let selection = prompt();
    while (selection  != "1" && selection != "2" && selection != "3"){
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

    console.log("Would you like to edit a Brand? Or view specific Hotel Chains?");
    console.log("1. Edit Brand");
    console.log("2. Delete Brand");
    console.log("3. Insert Brand");
    console.log("4. View Chains");
    let selection = prompt();
    while (selection  != "1" && selection != "2" && selection  != "3" && selection  != "4"){
        console.log('Please enter 1 2 3 or 4.');
        selection = prompt();
    }
    if (selection == 1) {
        editBrand(brand_ids);
    } else if (selection == 2) {
        deleteBrand(brand_ids)
    } else if (selection == 3) {
        
    } else if (selection == 4) {

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
const prompt = require('prompt-sync')({sigint: true});

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

function admin() {
    console.log("Welcome Admin");
    console.log("Here are the current Hotel Brands in the database");
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